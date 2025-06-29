package com.rekreacija.pac.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;
import reactor.util.retry.Retry;

import java.time.Duration;
import java.util.Map;

//@Service
public class ChatGptService {

    private final String apiKey;
    private final WebClient webClient;

    public ChatGptService(@Value("${openai.api.key}") String apiKey) {
        this.apiKey = apiKey;
        this.webClient = WebClient.builder()
                .baseUrl("https://api.openai.com/v1/chat/completions")
                .defaultHeader("Authorization", "Bearer " + this.apiKey) //
                .build(); //
    }

    public Mono<String> askChatGpt(String prompt) {
        Map<String, Object> requestBody = Map.of(
                "model", "gpt-3.5-turbo",
                "messages", new Object[]{
                        Map.of("role", "user", "content", prompt)
                },
                "temperature", 0.7
        );

        return webClient.post()
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(Map.class)
                .map(response -> {
                    var choices = (java.util.List<Map<String, Object>>) response.get("choices");
                    return choices.get(0).get("message") instanceof Map
                            ? (String) ((Map<String, Object>) choices.get(0).get("message")).get("content")
                            : "Nema odgovora.";
                });
    }
}