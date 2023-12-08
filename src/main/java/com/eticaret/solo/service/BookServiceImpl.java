package com.eticaret.solo.service;

import com.eticaret.solo.model.Book;
import com.eticaret.solo.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookRepository;

    @Override
    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public List<Book> getAllBook() {
        return bookRepository.findAll();
    }

    @Override
    public Book getBookById(int id) {
        Optional<Book> optionalBook = bookRepository.findById(id);
        return optionalBook.orElse(null);
    }

    @Override
    public void deleteBookById(int id) {
        bookRepository.deleteById(id);
    }
}
