#!/bin/bash

# 📝 Configuration Variables - EDIT THESE
PROJECT_ID="YOUR_GCP_PROJECT_ID"  # Replace with your Google Cloud Project ID
IMAGE_NAME="devops-ai-agents"
IMAGE_VERSION="1.0.0"  # Update this for version control
REGION="us-central1"  # Change to your preferred region

# 🔧 Full image path
GCR_IMAGE="gcr.io/${PROJECT_ID}/${IMAGE_NAME}:${IMAGE_VERSION}"
GCR_IMAGE_LATEST="gcr.io/${PROJECT_ID}/${IMAGE_NAME}:latest"

# 🖨️ Echo configuration
echo "🚀 Building and deploying to Google Cloud Run"
echo "📦 Project ID: ${PROJECT_ID}"
echo "📦 Image: ${IMAGE_NAME}"
echo "📦 Version: ${IMAGE_VERSION}"
echo "📦 Region: ${REGION}"
echo "📦 Full path: ${GCR_IMAGE}"

# 🔑 Ensure authentication with Google Cloud
echo "🔐 Authenticating with Google Cloud..."
gcloud auth configure-docker

# 🏗️ Build the Docker image
echo "🏗️ Building Docker image..."
docker build -t ${GCR_IMAGE} -t ${GCR_IMAGE_LATEST} .

# 📤 Push the image to Google Container Registry
echo "📤 Pushing to Google Container Registry..."
docker push ${GCR_IMAGE}
docker push ${GCR_IMAGE_LATEST}

# 🚀 Deploy to Cloud Run
echo "🚀 Deploying to Cloud Run..."
gcloud run deploy ${IMAGE_NAME} \
  --image ${GCR_IMAGE} \
  --platform managed \
  --region ${REGION} \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10 \
  --port 3000

echo "✨ Deployment complete!"
echo "🌐 Your application should be available at the URL provided above."
