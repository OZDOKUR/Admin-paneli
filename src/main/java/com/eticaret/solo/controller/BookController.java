package com.eticaret.solo.controller;

import com.eticaret.solo.model.Book;
import com.eticaret.solo.service.BookService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/book")
@CrossOrigin
public class BookController {
    @Autowired
    private BookService bookService;

    @GetMapping("/getAll")
    public List<Book> getAllBook() {
        return bookService.getAllBook();
    }

    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody Book book) {
        bookService.saveBook(book);
        return new ResponseEntity<>("New Book is added", HttpStatus.CREATED);
    }

    @PutMapping(value = "/{id}", consumes = "application/json")
    public ResponseEntity<String> updateBook(@PathVariable int id, @RequestBody Book updatedBook) {
        Book existingBook = bookService.getBookById(id);

        if (existingBook == null) {
            return new ResponseEntity<>("Book not found with id: " + id, HttpStatus.NOT_FOUND);
        }

        BeanUtils.copyProperties(updatedBook, existingBook, "id");

        bookService.saveBook(existingBook);

        return new ResponseEntity<>("Book updated successfully", HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBook(@PathVariable int id) {
        Book existingBook = bookService.getBookById(id);

        if (existingBook == null) {
            return new ResponseEntity<>("Book not found with id: " + id, HttpStatus.NOT_FOUND);
        }

        bookService.deleteBookById(id);

        return new ResponseEntity<>("Book deleted successfully", HttpStatus.OK);
    }
}

