/** @format */

const db = require("../db");
const app = require("../app");
const request = require("supertest");
const Book = require("../models/book");

describe("Test Book class", function () {
  beforeEach(async function () {
    await db.query("DELETE FROM books");
    // await db.query("ALTER SEQUENCE books_id_seq RESTART WITH 1");

    let b1 = await Book.create({
      isbn: "0691161518",
      amazon_url: "http://a.co/eobPtX2",
      author: "Matthew Lane",
      language: "english",
      pages: 264,
      publisher: "Princeton University Press",
      title: "Power-Up: Unlocking the Hidden Mathematics in Video Games",
      year: 2017,
    });
    let b2 = await Book.create({
      isbn: "1234567",
      amazon_url:
        "https://www.amazon.com/Training-Ladder-SKYROKU-Toddlers-Comfortable-Anti-Slip/dp/B07PBVLVWF/ref=sr_1_4?_encoding=UTF8&c=ts&keywords=Toilet%2BTraining%2BPotties%2B%26%2BSeats&qid=1637680134&s=baby-products&sr=1-4&ts_id=166889011&th=1",
      author: "James Jones",
      language: "spanish",
      pages: 1000,
      publisher: "Liberal University",
      title: "Poop",
      year: 2022,
    });
  });

  test("can create", async function () {
    let t = await Book.create({
      isbn: "0987654321",
      amazon_url:
        "https://www.amazon.com/Training-Ladder-SKYROKU-Toddlers-Comfortable-Anti-Slip/dp/B07PBVLVWF/ref=sr_1_4?_encoding=UTF8&c=ts&keywords=Toilet%2BTraining%2BPotties%2B%26%2BSeats&qid=1637680134&s=baby-products&sr=1-4&ts_id=166889011&th=1",
      author: "Kimmy K",
      language: "ubuntu",
      pages: 543,
      publisher: "Johnny Hopkins",
      title: "Investigation of Poop",
      year: 1996,
    });

    expect(t).toEqual({
      isbn: "0987654321",
      amazon_url:
        "https://www.amazon.com/Training-Ladder-SKYROKU-Toddlers-Comfortable-Anti-Slip/dp/B07PBVLVWF/ref=sr_1_4?_encoding=UTF8&c=ts&keywords=Toilet%2BTraining%2BPotties%2B%26%2BSeats&qid=1637680134&s=baby-products&sr=1-4&ts_id=166889011&th=1",
      author: "Kimmy K",
      language: "ubuntu",
      pages: 543,
      publisher: "Johnny Hopkins",
      title: "Investigation of Poop",
      year: 1996,
    });
  });
});

describe("POST /books new book", function () {
  test("Can create new book via POST req", async function () {
    let response = await request(app).post("/books").send({
      isbn: "0192837465",
      amazon_url:
        "https://www.amazon.com/Training-Ladder-SKYROKU-Toddlers-Comfortable-Anti-Slip/dp/B07PBVLVWF/ref=sr_1_4?_encoding=UTF8&c=ts&keywords=Toilet%2BTraining%2BPotties%2B%26%2BSeats&qid=1637680134&s=baby-products&sr=1-4&ts_id=166889011&th=1",
      author: "Lilly Lane",
      language: "React",
      pages: 1,
      publisher: "Peanut Gallery",
      title: "Waterbottles Unite",
      year: 1944,
    });
    expect(response.body).toEqual({
      book: {
        isbn: "0192837465",
        amazon_url:
          "https://www.amazon.com/Training-Ladder-SKYROKU-Toddlers-Comfortable-Anti-Slip/dp/B07PBVLVWF/ref=sr_1_4?_encoding=UTF8&c=ts&keywords=Toilet%2BTraining%2BPotties%2B%26%2BSeats&qid=1637680134&s=baby-products&sr=1-4&ts_id=166889011&th=1",
        author: "Lilly Lane",
        language: "React",
        pages: 1,
        publisher: "Peanut Gallery",
        title: "Waterbottles Unite",
        year: 1944,
      },
    });
  });

  test("Rejects bad input on new book request", async function () {
    let response = await request(app).post("/books").send({
      amazon_url:
        "https://www.amazon.com/Training-Ladder-SKYROKU-Toddlers-Comfortable-Anti-Slip/dp/B07PBVLVWF/ref=sr_1_4?_encoding=UTF8&c=ts&keywords=Toilet%2BTraining%2BPotties%2B%26%2BSeats&qid=1637680134&s=baby-products&sr=1-4&ts_id=166889011&th=1",
      author: "Lilly Lane",
      language: "React",
      pages: 1,
      publisher: "Peanut Gallery",
      title: "Waterbottles Unite",
      year: 1944,
    });
    expect(response.body).toEqual({
      error: {
        message: ['instance requires property "isbn"'],
        status: 400,
      },
      message: ['instance requires property "isbn"'],
    });
  });
});

afterAll(async function () {
  await db.end();
});
