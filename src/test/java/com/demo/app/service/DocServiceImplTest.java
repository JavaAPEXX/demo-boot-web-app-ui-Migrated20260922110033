package com.demo.app.service;

import com.demo.app.model.Document;
import com.demo.app.repository.DocRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class DocServiceImplTest {

    @Mock
    private DocRepository docRepository;

    @InjectMocks
    private DocServiceImpl docServiceImpl;

    @Test
    @DisplayName("givenValidInput_whenDocServiceImpl_thenReturnSuccess")
    void givenValidInput_whenDocServiceImpl_thenReturnSuccess() {
        // Arrange
        when(docRepository.findUserDocs(1L)).thenReturn(List.of(new Document(1L, "doc1")));

        // Act
        List<Document> result = docServiceImpl.findAllDocs(1L);

        // Assert
        assertEquals(1, result.size());
    }

    @Test
    @DisplayName("givenInvalidInput_whenDocServiceImpl_thenThrowNotFoundException")
    void givenInvalidInput_whenDocServiceImpl_thenThrowNotFoundException() {
        // Arrange
        when(docRepository.findUserDocs(1L)).thenReturn(Optional.empty());

        // Act and Assert
        assertThrows(NotFoundException.class, () -> docServiceImpl.findAllDocs(1L));
    }

    @Test
    @DisplayName("givenNullInput_whenDocServiceImpl_thenThrowIllegalArgumentException")
    void givenNullInput_whenDocServiceImpl_thenThrowIllegalArgumentException() {
        // Arrange
        when(docRepository.findUserDocs(null)).thenThrow(NullPointerException.class);

        // Act and Assert
        assertThrows(NullPointerException.class, () -> docServiceImpl.findAllDocs(null));
    }

    @Test
    @DisplayName("givenEmptyDatabase_whenDocServiceImpl_thenReturnEmptyList")
    void givenEmptyDatabase_whenDocServiceImpl_thenReturnEmptyList() {
        // Arrange
        when(docRepository.findUserDocs(1L)).thenReturn(List.of());

        // Act
        List<Document> result = docServiceImpl.findAllDocs(1L);

        // Assert
        assertEquals(0, result.size());
    }

    @Test
    @DisplayName("givenNonExistingUser_whenDocServiceImpl_thenThrowNotFoundException")
    void givenNonExistingUser_whenDocServiceImpl_thenThrowNotFoundException() {
        // Arrange
        when(docRepository.findUserDocs(1L)).thenReturn(Optional.empty());

        // Act and Assert
        assertThrows(NotFoundException.class, () -> docServiceImpl.findAllDocs(1L));
    }

    @Test
    @DisplayName("givenDuplicateDocument_whenDocServiceImpl_thenThrowDuplicateDocumentException")
    void givenDuplicateDocument_whenDocServiceImpl_thenThrowDuplicateDocumentException() {
        // Arrange
        when(docRepository.findUserDocs(1L)).thenReturn(List.of(new Document(1L, "doc1")));

        // Act and Assert
        assertThrows(DuplicateDocumentException.class, () -> docServiceImpl.findAllDocs(1L));
    }
}