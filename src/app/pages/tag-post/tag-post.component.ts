import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TagService } from '../../services/tag.service';

@Component({
  selector: 'app-tag-post',
  templateUrl: './tag-post.component.html',
  styleUrls: ['./tag-post.component.css'],
})
export class TagPostComponent implements OnInit {
  constructor(
    private actRoute: ActivatedRoute,
    private userDetailService: TagService
  ) {}

  id: string;
  tagData: any = [];

  ngOnInit() {
    this.actRoute.params.subscribe((params) => {
      this.id = params.tagId;
      this.loadTagPost();
    });
  }

  loadTagPost() {
    return this.userDetailService
      .GetPostByTag(this.id)
      .subscribe((data: {}) => {
        this.tagData = data;
        this.tagData.data.forEach((item) => {
          let time = item.publishDate.match(/\d\d:\d\d/);
          item.publishDate = item.publishDate.split('T')[0] + ' - ' + time;
        });
      });
  }
}
