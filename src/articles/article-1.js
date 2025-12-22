export const article1 = {
    id: 1,
    title: 'Building Scalable Microservices with Spring Boot and Kafka',
    category: 'Backend',
    author: 'Phạm Quang Huy',
    date: 'Dec 15, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    excerpt: 'A comprehensive guide on designing and implementing microservices architecture using Spring Boot, with event-driven communication via Kafka for high-volume data processing.',
    content: `
## Building Scalable Microservices with Spring Boot and Kafka

Microservices architecture has become the gold standard for building large-scale, distributed applications. In this comprehensive guide, we'll explore how to design and implement a robust microservices system using Spring Boot and Kafka.

### Why Microservices?

Traditional monolithic applications often struggle with scalability, flexibility, and deployment speed. Microservices break down applications into smaller, independently deployable services that can be scaled, updated, and maintained separately.

### Setting Up Spring Boot Services

Spring Boot provides excellent support for building microservices with its opinionated defaults and extensive ecosystem:

\`\`\`java
@SpringBootApplication
@EnableDiscoveryClient
public class ProductServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(ProductServiceApplication.class, args);
    }
}
\`\`\`

### Event-Driven Communication with Kafka

Kafka enables asynchronous, event-driven communication between services. This decouples services and allows for high-throughput, low-latency data streaming.

#### Producer Configuration

\`\`\`java
@Configuration
public class KafkaProducerConfig {
    @Bean
    public ProducerFactory<String, String> producerFactory() {
        Map<String, Object> configProps = new HashMap<>();
        configProps.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
        configProps.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        configProps.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        return new DefaultProducerFactory<>(configProps);
    }

    @Bean
    public KafkaTemplate<String, String> kafkaTemplate() {
        return new KafkaTemplate<>(producerFactory());
    }
}
\`\`\`

#### Consumer Configuration

\`\`\`java
@Service
public class OrderConsumer {
    @KafkaListener(topics = "order-events", groupId = "order-group")
    public void consumeOrderEvent(String message) {
        // Process order event
        System.out.println("Received order event: " + message);
    }
}
\`\`\`

### Best Practices

1. **Service Independence**: Each service should have its own database and be deployable independently
2. **API Gateway**: Use an API Gateway to manage routing and authentication
3. **Circuit Breakers**: Implement circuit breaker patterns to handle failures gracefully
4. **Monitoring and Logging**: Use centralized logging (ELK stack) and monitoring (Prometheus) for visibility

### Deployment with Docker and Kubernetes

Package each microservice as a Docker container and orchestrate with Kubernetes for automatic scaling and management.

### Conclusion

Building scalable microservices with Spring Boot and Kafka provides a solid foundation for creating modern, distributed applications that can grow with your business needs.
    `
};
