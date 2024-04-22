import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrl: './bookmark.component.css'
})
export class BookmarkComponent implements OnInit {
  bookmarkedArticle: any[] = []
  constructor() { }

  ngOnInit(): void {
    this.bookmarkedArticle = JSON.parse(localStorage.getItem('myBookmark') || '[]') || []
  }
}
