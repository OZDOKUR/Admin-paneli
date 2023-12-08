package com.eticaret.solo.service;

import com.eticaret.solo.model.Book;

import java.util.List;

public interface BookService {

    public Book saveBook(Book book);
    public List<Book> getAllBook();

    Book getBookById(int id);

    void deleteBookById(int id);
}
