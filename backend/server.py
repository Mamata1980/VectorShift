from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Any, Dict, Optional
import uuid
from datetime import datetime, timezone
from collections import defaultdict


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Pipeline Models
class PipelineNode(BaseModel):
    id: str
    type: Optional[str] = None
    position: Optional[Dict[str, Any]] = None
    data: Optional[Dict[str, Any]] = None

class PipelineEdge(BaseModel):
    id: Optional[str] = None
    source: str
    target: str
    sourceHandle: Optional[str] = None
    targetHandle: Optional[str] = None

class PipelineRequest(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

class PipelineResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool

# Helper function to check if graph is a DAG using DFS
def is_directed_acyclic_graph(nodes: List[Dict], edges: List[Dict]) -> bool:
    """
    Check if the given nodes and edges form a Directed Acyclic Graph (DAG).
    Uses DFS to detect cycles.
    
    Returns True if it's a DAG (no cycles), False otherwise.
    """
    if not nodes:
        return True  # Empty graph is technically a DAG
    
    # Build adjacency list
    graph = defaultdict(list)
    node_ids = set()
    
    for node in nodes:
        node_id = node.get('id')
        if node_id:
            node_ids.add(node_id)
    
    for edge in edges:
        source = edge.get('source')
        target = edge.get('target')
        if source and target:
            graph[source].append(target)
    
    # DFS with coloring to detect cycles
    # WHITE (0) = unvisited, GRAY (1) = in current path, BLACK (2) = finished
    WHITE, GRAY, BLACK = 0, 1, 2
    color = {node_id: WHITE for node_id in node_ids}
    
    def has_cycle(node):
        """Returns True if a cycle is found starting from this node."""
        color[node] = GRAY
        
        for neighbor in graph[node]:
            if neighbor in color:
                if color[neighbor] == GRAY:
                    # Found a back edge, cycle detected
                    return True
                if color[neighbor] == WHITE:
                    if has_cycle(neighbor):
                        return True
        
        color[node] = BLACK
        return False
    
    # Check all nodes (handles disconnected components)
    for node_id in node_ids:
        if color[node_id] == WHITE:
            if has_cycle(node_id):
                return False  # Has cycle, not a DAG
    
    return True  # No cycles found, it's a DAG

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/pipelines/parse", response_model=PipelineResponse)
async def parse_pipeline(pipeline: PipelineRequest):
    """
    Parse the pipeline to calculate:
    - Number of nodes
    - Number of edges
    - Whether the graph is a DAG (Directed Acyclic Graph)
    """
    nodes = pipeline.nodes
    edges = pipeline.edges
    
    num_nodes = len(nodes)
    num_edges = len(edges)
    is_dag = is_directed_acyclic_graph(nodes, edges)
    
    return PipelineResponse(
        num_nodes=num_nodes,
        num_edges=num_edges,
        is_dag=is_dag
    )

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
