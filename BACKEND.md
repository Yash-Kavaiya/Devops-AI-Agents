# DevOps AI Agents - Backend Documentation

## Overview

The backend for the DevOps AI Agents platform has been consolidated into a single `main.py` file for easier management and deployment.

## Structure

All AI agent definitions are now centralized in `/main.py`, which contains:

### Agent Definitions

The file defines 10 specialized AI agents for different DevOps domains:

1. **home_agent** - General user questions and assistance
2. **ci_cd_agent** - CI/CD pipelines and continuous delivery
3. **cloud_infra_agent** - Cloud infrastructure management (AWS, Azure, GCP)
4. **code_anals_agent** - Code analysis, quality, and metrics
5. **securi_agent** - Security scanning and vulnerability detection
6. **performance_agent** - Performance monitoring and optimization
7. **load_agent** - Load testing and stress testing
8. **monier_agent** - System monitoring and observability
9. **cona_agent** - Container orchestration (Docker, Kubernetes)
10. **iinciden_agent** - Incident response and troubleshooting

### Helper Functions and Structures

- **`AGENTS` dictionary**: Maps module names to their corresponding agents
- **`get_agent(module_name)`**: Retrieves an agent by its module name
- **`root_agent`**: Alias for the home agent (backward compatibility)

## Usage

### Importing the Backend

```python
from main import AGENTS, get_agent, root_agent

# Get a specific agent by name
ci_cd = get_agent('ci_cd')
cloud = get_agent('cloud_infra')

# Access all agents
for name, agent in AGENTS.items():
    print(f"{name}: {agent.description}")

# Use the root agent (backward compatible)
response = root_agent.query("How do I deploy my app?")
```

### Running the Backend

You can run the main.py file directly to verify the backend:

```bash
python3 main.py
```

This will display all available agents and their descriptions.

## Migration Notes

### Previous Structure
Previously, each module had its own directory with:
- `<module>/agent.py` - Agent definition
- `<module>/__init__.py` - Module initialization

### Current Structure
All agents are now defined in a single `main.py` file at the root level.

### Backward Compatibility
- The `root_agent` variable is still available for existing code
- All agents maintain the same interface and functionality
- Module-specific names are preserved in the AGENTS dictionary

## Dependencies

The backend requires the Google ADK library:

```python
from google.adk.agents.llm_agent import Agent
```

Ensure you have the necessary dependencies installed to use the agents.

## Development

### Adding a New Agent

To add a new agent, follow this pattern in `main.py`:

```python
# New Agent
new_module_agent = Agent(
    model='gemini-2.5-flash',
    name='new_module_agent',
    description='A helpful assistant for new module questions.',
    instruction='Answer user questions about new module to the best of your knowledge',
)

# Add to AGENTS dictionary
AGENTS['new_module'] = new_module_agent
```

### Testing

The backend structure can be validated using Python's AST module:

```python
import ast

with open('main.py', 'r') as f:
    tree = ast.parse(f.read())
# Validate structure...
```

## Benefits of Consolidation

1. **Simplified Deployment**: Single file to deploy and manage
2. **Easier Maintenance**: All agent definitions in one place
3. **Better Overview**: Easy to see all agents at a glance
4. **Reduced Duplication**: Shared imports and structure
5. **Version Control**: Easier to track changes to agent configurations

## Support

For issues or questions about the backend, please refer to the main repository documentation or open an issue on GitHub.
