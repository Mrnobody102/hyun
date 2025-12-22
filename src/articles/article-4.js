export const article4 = {
    id: 4,
    title: 'Docker & Kubernetes: Container Orchestration Best Practices',
    category: 'DevOps',
    author: 'Phạm Quang Huy',
    date: 'Nov 28, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    excerpt: 'Essential Docker and Kubernetes concepts, deployment strategies, and best practices for production-grade containerized applications and microservices.',
    content: `
## Docker & Kubernetes: Container Orchestration Best Practices

Docker and Kubernetes have revolutionized application deployment. This guide covers essential concepts and best practices for containerized applications.

### Docker Fundamentals

#### Creating a Dockerfile

\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
\`\`\`

#### Building and Running Containers

\`\`\`bash
# Build image
docker build -t myapp:1.0 .

# Run container
docker run -d -p 3000:3000 --name myapp-container myapp:1.0

# View logs
docker logs -f myapp-container
\`\`\`

### Kubernetes Deployment

#### Deployment Configuration

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp
        image: myapp:1.0
        ports:
        - containerPort: 3000
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "500m"
\`\`\`

#### Service Configuration

\`\`\`yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  type: LoadBalancer
  selector:
    app: myapp
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
\`\`\`

### Best Practices

1. **Use Alpine Linux**: Reduce image size for faster deployment
2. **Multi-stage Builds**: Keep final images lean
3. **Resource Limits**: Set CPU and memory limits to prevent resource exhaustion
4. **Health Checks**: Implement readiness and liveness probes
5. **Logging**: Use centralized logging solutions
6. **Security**: Scan images for vulnerabilities and use secrets management

### Deployment Strategies

#### Rolling Update

\`\`\`bash
kubectl set image deployment/myapp-deployment myapp=myapp:2.0
kubectl rollout status deployment/myapp-deployment
\`\`\`

#### Blue-Green Deployment

Maintain two identical production environments and switch traffic between them for zero-downtime deployments.

### Monitoring and Scaling

Use Prometheus and Grafana for monitoring, and configure autoscaling:

\`\`\`yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: myapp-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: myapp-deployment
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 80
\`\`\`

### Conclusion

Docker and Kubernetes enable efficient, scalable, and reliable deployments. Master these tools to streamline your infrastructure and improve application reliability.
    `
};
