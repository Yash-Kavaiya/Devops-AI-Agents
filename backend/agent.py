import os
from strands import Agent
from strands.models.gemini import GeminiModel
from strands.tools.mcp import MCPClient
from mcp.client.stdio import stdio_client, StdioServerParameters

# Initialize Gemini Model
model = GeminiModel(
    client_args={
os.getenv("GEMINI_API_KEY"),
    },
    model_id="gemini-2.5-flash",
    params={
        "temperature": 0.7,
        "max_output_tokens": 2048,
        "top_p": 0.9,
        "top_k": 40
    }
)

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

# Main execution
if __name__ == "__main__":
    
    # CRITICAL: Agent MUST be created INSIDE context manager
    with stdio_mcp_client:
        # Get tools from filesystem MCP server
        tools = stdio_mcp_client.list_tools_sync()

        # Create agent with Gemini model and filesystem tools
        agent = Agent(model=model, tools=tools)

        # Use agent INSIDE context manager
        try:
            response = agent("List files in the current directory")
            print("✅ Agent Response:", response)

            # Additional examples
            response2 = agent("Read the README.md file if it exists")
            print("✅ Second Response:", response2)
            
        except Exception as e:
            print(f"❌ Error: {e}")
            raise
    
    # Context manager automatically closes the connection here
    print("✅ Agent session completed successfully")