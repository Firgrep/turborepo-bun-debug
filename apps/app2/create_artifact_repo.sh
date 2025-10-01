gcloud artifacts repositories create my-docker-repo \
    --location=us-central1 \
    --repository-type=docker \
    --description="Repository for my Docker images"

gcloud beta artifacts repositories update my-docker-repo \
    --location=us-central1 \
    --update-cleanup-policy=name=keep-last-5,policy-type=keep-most-recent-versions,keep-count=5 \
    --update-cleanup-policy=name=delete-old,policy-type=conditional-delete,older-than=2d

gcloud artifacts repositories describe my-docker-repo \
    --location=europe-north1 \
    --format='value(name)' > /dev/null 2>&1

gcloud artifacts repositories describe my-docker-repo \
    --location=europe-north1 \
    --format='value(name)' > /dev/null 2>&1
if [[ $? -eq 0 ]]; then
  echo "Repository 'my-docker-repo' already exists."
else
  echo "Repository 'my-docker-repo' does not exist. Creating it..."
  # ... (Your repository creation command from before) ...
fi
