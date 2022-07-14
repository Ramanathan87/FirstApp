import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map, Subject ,catchError,throwError, Subscription} from 'rxjs';
import { AuthService } from '../auth.service';
import { Post } from './post.model';
import { PostsService } from './posts.service';
@Component({
  selector: 'app-http-req',
  templateUrl: './http-req.component.html',
  styleUrls: ['./http-req.component.css']
})
export class HttpReqComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = "";
  token!:string;
  private errorSub!: Subscription;

  constructor(private http: HttpClient, private postsService: PostsService,private authService:AuthService) {
    this.token=this.authService.getToken();
    // console.log(this.token);
  }

  ngOnInit() {
    this.errorSub = this.postsService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });
    
    this.isFetching = true;
    this.postsService.fetchPosts(this.token).subscribe(
      posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      error => {
        this.isFetching = false;
        this.error = error.message;
      }
    );
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postsService.createAndStorePost(postData.title, postData.content,this.token);
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postsService.fetchPosts(this.token).subscribe(
      posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      error => {
        this.isFetching = false;
        this.error = error.message;
        console.log(error);
      }
    );
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  onHandleError() {
    this.error = "";
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }
  delete(id:any){
    console.log(id);
    
  }
  

}
