"""
DevOps AI Agents Platform - Main Backend File
Consolidated agent definitions for all DevOps modules
"""

from google.adk.agents.llm_agent import Agent

# Home Agent
home_agent = Agent(
    model='gemini-2.5-flash',
    name='home_agent',
    description='A helpful assistant for user questions.',
    instruction='Answer user questions to the best of your knowledge',
)

# CI/CD Pipeline Agent
ci_cd_agent = Agent(
    model='gemini-2.5-flash',
    name='ci_cd_agent',
    description='A helpful assistant for CI/CD pipeline questions.',
    instruction='Answer user questions about CI/CD pipelines, continuous integration, and continuous delivery to the best of your knowledge',
)

# Cloud Infrastructure Agent
cloud_infra_agent = Agent(
    model='gemini-2.5-flash',
    name='cloud_infra_agent',
    description='A helpful assistant for cloud infrastructure questions.',
    instruction='Answer user questions about cloud infrastructure, AWS, Azure, GCP, and cloud resources to the best of your knowledge',
)

# Code Analysis Agent
code_anals_agent = Agent(
    model='gemini-2.5-flash',
    name='code_anals_agent',
    description='A helpful assistant for code analysis questions.',
    instruction='Answer user questions about code analysis, static analysis, code quality, and code metrics to the best of your knowledge',
)

# Security Scanning Agent
securi_agent = Agent(
    model='gemini-2.5-flash',
    name='securi_agent',
    description='A helpful assistant for security scanning questions.',
    instruction='Answer user questions about security scanning, vulnerability detection, and security best practices to the best of your knowledge',
)

# Performance Monitoring Agent
performance_agent = Agent(
    model='gemini-2.5-flash',
    name='performance_agent',
    description='A helpful assistant for performance monitoring questions.',
    instruction='Answer user questions about performance monitoring, metrics, and optimization to the best of your knowledge',
)

# Load Testing Agent
load_agent = Agent(
    model='gemini-2.5-flash',
    name='load_agent',
    description='A helpful assistant for load testing questions.',
    instruction='Answer user questions about load testing, stress testing, and performance benchmarking to the best of your knowledge',
)

# Monitoring Agent
monier_agent = Agent(
    model='gemini-2.5-flash',
    name='monier_agent',
    description='A helpful assistant for monitoring questions.',
    instruction='Answer user questions about system monitoring, alerting, and observability to the best of your knowledge',
)

# Container Orchestration Agent
cona_agent = Agent(
    model='gemini-2.5-flash',
    name='cona_agent',
    description='A helpful assistant for container orchestration questions.',
    instruction='Answer user questions about containers, Kubernetes, Docker, and container orchestration to the best of your knowledge',
)

# Incident Response Agent
iinciden_agent = Agent(
    model='gemini-2.5-flash',
    name='iinciden_agent',
    description='A helpful assistant for incident response questions.',
    instruction='Answer user questions about incident response, troubleshooting, and incident management to the best of your knowledge',
)

# Dictionary mapping module names to their agents for easy access
AGENTS = {
    'home': home_agent,
    'ci_cd': ci_cd_agent,
    'cloud_infra': cloud_infra_agent,
    'code_anals': code_anals_agent,
    'securi': securi_agent,
    'performance': performance_agent,
    'load': load_agent,
    'monier': monier_agent,
    'cona': cona_agent,
    'iinciden': iinciden_agent,
}

# Backward compatibility: export root_agent as the home agent
root_agent = home_agent


def get_agent(module_name: str) -> Agent:
    """
    Get an agent by module name.
    
    Args:
        module_name: Name of the module (e.g., 'ci_cd', 'cloud_infra')
    
    Returns:
        The corresponding Agent instance
    
    Raises:
        KeyError: If the module name is not found
    """
    return AGENTS[module_name]


if __name__ == '__main__':
    print("DevOps AI Agents Platform - Main Backend")
    print("=" * 50)
    print("\nAvailable Agents:")
    for name, agent in AGENTS.items():
        print(f"  - {name}: {agent.description}")
    print("\nBackend initialized successfully!")
