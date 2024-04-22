import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.css'
})
export class NewsDetailComponent implements OnInit {
  newsArticle: any = {}
  constructor () {}

  ngOnInit(): void {
    this.newsArticle = JSON.parse(localStorage.getItem('newsDetails') || '[]')
    console.log(this.newsArticle)
  }
}
