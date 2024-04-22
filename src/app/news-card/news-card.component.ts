import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.css'
})
export class NewsCardComponent implements OnInit {
  @Input() news: any = []
  isBookmarkedPage = false
  isBookmarked = false
  constructor (private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      const routeTitleSymbol = Object.getOwnPropertySymbols(data)[0]
      const routeTitle = data[routeTitleSymbol]
      if (routeTitle === 'Bookmarks') {
        this.isBookmarkedPage = true
      }
    })
    const exsistingBookmark = JSON.parse(localStorage.getItem('myBookmark') || '[]') || []
    if(!exsistingBookmark.find((val: { title: any; }) => val?.title === this.news.title)) {
      this.isBookmarked = false
    } else {
        this.isBookmarked = true
    }
  }
  toggleBookMark(article: any): void {
    const exsistingBookmark = JSON.parse(localStorage.getItem('myBookmark') || '[]') || []
    const index = exsistingBookmark.findIndex((item: { title: any; }) => item?.title === article.title)
    if (index !== -1) {
        exsistingBookmark.splice(index, 1);
    } else {
        exsistingBookmark.push(article);
    }
    localStorage.setItem('myBookmark', JSON.stringify(exsistingBookmark))

    if(!exsistingBookmark.find((val: { title: any; }) => val?.title === article.title)) {
        this.isBookmarked = false;
    } else {
        this.isBookmarked = true;
    }
  }
  redirectToDeatil(item:any) {
    localStorage.setItem('newsDetails', JSON.stringify(item))
    this.router.navigate(['/details', item.title])
  }
}
