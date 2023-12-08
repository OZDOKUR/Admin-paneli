package com.eticaret.solo.repository;

import com.eticaret.solo.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository <Book, Integer> {
}
