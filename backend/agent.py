import os
from strands import Agent
from strands.models.gemini import GeminiModel
from strands.tools.mcp import MCPClient
from mcp.client.stdio import stdio_client, StdioServerParameters

# Initialize Gemini Model
def create_model(temperature=0.7):
    return GeminiModel(
        client_args={
            "api_key": os.getenv("GEMINI_API_KEY"),
        },
        model_id="gemini-2.5-flash",
        params={
            "temperature": temperature,
            "max_output_tokens": 2048,
            "top_p": 0.9,
            "top_k": 40
        }
    )

# MCP Client for filesystem operations
stdio_mcp_client = MCPClient(lambda: stdio_client(
    StdioServerParameters(
        command="npx", 
        args=[
            "-y", 
            "@modelcontextprotocol/server-filesystem",
            "/"
        ]
    )
))

# Sub-Agent 1: Infrastructure Provisioning Agent
def create_infrastructure_agent(tools):
    return Agent(
        model=create_model(temperature=0.5),
        tools=tools,
        system_prompt="""You are an Infrastructure Provisioning Agent specialized in:
- Creating and managing cloud infrastructure (AWS, Azure, GCP)
- Writing Terraform, CloudFormation, and Pulumi configurations
- Setting up VPCs, subnets, security groups, and networking
- Provisioning compute resources (EC2, VMs, containers)"""
    )

# Sub-Agent 2: CI/CD Pipeline Agent
def create_cicd_agent(tools):
    return Agent(
        model=create_model(temperature=0.6),
        tools=tools,
        system_prompt="""You are a CI/CD Pipeline Agent specialized in:
- Creating and optimizing CI/CD pipelines (GitHub Actions, GitLab CI, Jenkins)
- Implementing build, test, and deployment workflows
- Managing artifact repositories and container registries
- Setting up automated testing and quality gates"""
    )

# Sub-Agent 3: Container Orchestration Agent
def create_container_agent(tools):
    return Agent(
        model=create_model(temperature=0.5),
        tools=tools,
        system_prompt="""You are a Container Orchestration Agent specialized in:
- Managing Kubernetes clusters and resources
- Writing Docker and container configurations
- Creating Helm charts and Kustomize overlays
- Implementing service mesh and ingress configurations"""
    )

# Sub-Agent 4: Monitoring & Observability Agent
def create_monitoring_agent(tools):
    return Agent(
        model=create_model(temperature=0.6),
        tools=tools,
        system_prompt="""You are a Monitoring & Observability Agent specialized in:
- Setting up monitoring solutions (Prometheus, Grafana, Datadog)
- Creating dashboards and alerts
- Implementing logging solutions (ELK, Loki, CloudWatch)
- Configuring distributed tracing and APM"""
    )

# Sub-Agent 5: Security & Compliance Agent
def create_security_agent(tools):
    return Agent(
        model=create_model(temperature=0.4),
        tools=tools,
        system_prompt="""You are a Security & Compliance Agent specialized in:
- Implementing security best practices and policies
- Managing secrets and credentials (Vault, AWS Secrets Manager)
- Conducting security audits and vulnerability scanning
- Ensuring compliance with standards (SOC2, HIPAA, PCI-DSS)"""
    )

# Sub-Agent 6: Database Management Agent
def create_database_agent(tools):
    return Agent(
        model=create_model(temperature=0.5),
        tools=tools,
        system_prompt="""You are a Database Management Agent specialized in:
- Managing relational and NoSQL databases
- Creating backup and disaster recovery strategies
- Optimizing database performance and queries
- Implementing database migrations and schema changes"""
    )

# Sub-Agent 7: Configuration Management Agent
def create_config_agent(tools):
    return Agent(
        model=create_model(temperature=0.5),
        tools=tools,
        system_prompt="""You are a Configuration Management Agent specialized in:
- Managing configuration with Ansible, Chef, Puppet
- Implementing Infrastructure as Code best practices
- Managing environment-specific configurations
- Automating server provisioning and configuration"""
    )

# Sub-Agent 8: Incident Response Agent
def create_incident_agent(tools):
    return Agent(
        model=create_model(temperature=0.7),
        tools=tools,
        system_prompt="""You are an Incident Response Agent specialized in:
- Diagnosing and troubleshooting production issues
- Analyzing logs and metrics for root cause analysis
- Implementing incident response procedures
- Creating post-mortem reports and remediation plans"""
    )

# Root Agent: DevOps Orchestrator
def create_root_agent(sub_agents):
    return Agent(
        model=create_model(temperature=0.7),
        tools=[],
        system_prompt=f"""You are the Root DevOps Orchestrator Agent. You coordinate and delegate tasks to 8 specialized sub-agents:

1. Infrastructure Provisioning Agent - Cloud infrastructure and IaC
2. CI/CD Pipeline Agent - Build and deployment automation
3. Container Orchestration Agent - Kubernetes and container management
4. Monitoring & Observability Agent - Metrics, logs, and tracing
5. Security & Compliance Agent - Security policies and compliance
6. Database Management Agent - Database operations and optimization
7. Configuration Management Agent - Server configuration and automation
8. Incident Response Agent - Troubleshooting and incident management

Your role is to:
- Analyze incoming requests and determine which sub-agent(s) to delegate to
- Coordinate multi-agent workflows when tasks span multiple domains
- Synthesize responses from sub-agents into coherent solutions
- Ensure best practices across all DevOps domains"""
    )

# Main execution
if __name__ == "__main__":
    
    with stdio_mcp_client:
        # Get tools from filesystem MCP server
        tools = stdio_mcp_client.list_tools_sync()

        # Create all 8 sub-agents
        sub_agents = {
            "infrastructure": create_infrastructure_agent(tools),
            "cicd": create_cicd_agent(tools),
            "container": create_container_agent(tools),
            "monitoring": create_monitoring_agent(tools),
            "security": create_security_agent(tools),
            "database": create_database_agent(tools),
            "config": create_config_agent(tools),
            "incident": create_incident_agent(tools)
        }

        # Create root agent
        root_agent = create_root_agent(sub_agents)

        print("✅ DevOps AI Agent System Initialized")
        print(f"   - Root Agent: DevOps Orchestrator")
        print(f"   - Sub-Agents: {len(sub_agents)}")
        for name in sub_agents.keys():
            print(f"     • {name.capitalize()} Agent")

        # Example usage
        try:
            # Root agent analyzes the request
            task = "Set up a production-ready Kubernetes cluster with monitoring"
            print(f"\n📋 Task: {task}")
            
            response = root_agent(f"""Analyze this DevOps task and determine which sub-agents should handle it: {task}
            
Provide a delegation plan.""")
            print(f"\n🤖 Root Agent Plan:\n{response}")

            # Example: Delegate to specific sub-agents
            print("\n🔧 Executing with Container Agent...")
            container_response = sub_agents["container"]("Create a basic Kubernetes deployment YAML for a web application")
            print(f"Container Agent: {container_response}")

            print("\n📊 Executing with Monitoring Agent...")
            monitoring_response = sub_agents["monitoring"]("Suggest monitoring setup for Kubernetes cluster")
            print(f"Monitoring Agent: {monitoring_response}")
            
        except Exception as e:
            print(f"❌ Error: {e}")
            raise
    
    print("\n✅ Agent session completed successfully")