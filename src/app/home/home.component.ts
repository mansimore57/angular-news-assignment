import { Component, HostListener, OnInit } from '@angular/core';
import { NewsService } from '../service/news.serice';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { fetchAllNews } from '../state/news.action';
import { country } from '../../assets/data/country';
import { category } from '../../assets/data/category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  allnews: Observable<any>
  isLoading = false
  allNewsArticle: any = []
  pageSize = 10
  country: any = country
  category: any = category
  searchedCountry =  ''
  searchedCategory = ''
  searchedValue = ''
  
  constructor (private newsService: NewsService, private store: Store) {
    this.allnews = store.select(state => state)
  }

  async ngOnInit()  {
    const payload = {
      category: this.searchedCategory,
      country: this.searchedCountry,
      textVal: this.searchedValue
    }
    this.fetchNewsArticle(this.pageSize, payload)
    this.allnews.subscribe(state => {
      console.log(state)
      this.allNewsArticle = state.news.allArticle
    })
    
  }

  countryKeys() {
    return Object.keys(this.country);
  }
  categoryKeys() {
    return Object.keys(this.category)
  }


  fetchNewsArticle (pageSize: number, params: {}) {
    this.isLoading = true
    this.newsService.fetchNewsData(pageSize, params).subscribe(data => {
      this.store.dispatch(fetchAllNews({allArticle: data.articles}))
    })
    this.isLoading = false
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const documentHeight = document.body.scrollHeight
    const viewportHeight = window.innerHeight
    const scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop

    if (documentHeight - viewportHeight - scrollPosition < 10) {
      this.pageSize = this.pageSize + 10
      const payload = {
        category: this.searchedCategory,
        country: this.searchedCountry,
        textVal: this.searchedValue
      }
      if(!this.isLoading) this.fetchNewsArticle(this.pageSize, payload)
    }
  }
  handleSearchArticle () {
    const payload = {
      category: this.searchedCategory,
      country: this.searchedCountry,
      textVal: this.searchedValue
    }
    this.pageSize = 10
    this.fetchNewsArticle(this.pageSize, payload)
  }
}
