import { Injectable, ViewChild, ViewContainerRef } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { employeeAllData } from './employeeAllData'
import 'rxjs/add/operator/map';
import { ToastrService } from 'ngx-toastr';
import { BlockUIService } from './../../common/blockUI/blockUI.service';
import { paginate } from './../../common/paginate/paginate';

@Injectable()
export class EmployeeService {
  //取回的內容
  datas:Observable<any>;
  error:any;
  findAllUrl: string;
  employeeAllData : employeeAllData;
  currentData:any={};   //被選取作用中的單筆資料
  editMode:string='';   //記錄編輯模式為何？Edit:編輯中, AddNew:新增中,空字串為非作用中，初始值為''非作用中。
  cbChecked: string[];
  paginate: paginate; //分頁
  pageNumArray:number[]=[];   //用以存放所有分頁的數字(3頁就會是1,2,3)
  pageNumArrayMax:number=0;   //分頁數的陣列最大數
  startPg:number=0;     //分頁陣列，開始的頁數
  pageSize: number=5; //每頁筆數

  constructor(private http: Http,
              private toastrService: ToastrService,
              private viewContainerRef: ViewContainerRef,
              private blockUI: BlockUIService) {
    this.blockUI.vRef= this.viewContainerRef;
    this.findAllUrl = 'RB/user/findAll';
    this.cbChecked = [];
    this.paginate = {
        totalPages: 0,
        size: 0,
        totalElements: 0,
        page: 0,
      };
    this.findAll();
  }

  doSetcurrentData(oData:any){
    this.currentData=oData;
    this.editMode='Edit';
  }

  doDetailInit() {
    this.doCancel();
  }

  doCancel(){
    this.editMode = '';
    this.currentData={};
  }

  //新增
  doInsert(){
    let url:string='RB/user/new';
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers:headers});
    this.http.post(url,this.currentData, options)
    .subscribe(
      (value:Response)=>{
        this.toastrService.success('新增完成！', '成功');
        this.doDetailInit();
        this.findAll();
      },
      (error)=>{
        this.error = error;
        this.toastrService.error(error, '失敗');
      }
    );

  }

  //修改
  doUpdate(){
    let url:string='RB/user/save';
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers:headers});

    const p1 = new Promise((resolve, reject) => {
      resolve();
    });
    p1.then(() => {
      this.blockUI.start();
    }).then(() => {
        this.http.post(url,this.currentData, options)

        .subscribe(
          (value:Response)=>{
            let res = value.json();
            if (res.status) {
              this.toastrService.success('更新完成！', '成功');
              this.doDetailInit();
            }
          },
          (error)=>{
            this.error = error;
            this.toastrService.error(error, '失敗');
            this.blockUI.stop();
          },
          () => {
            console.log("the Update is completed")
            this.blockUI.stop();
          }
        );
    })
  }

  doDelete () {
     console.log("service 刪除");
     let url:string='RB/user/delete';
     let headers = new Headers({'Content-Type':'application/json'});
     let options = new RequestOptions({headers:headers});
     this.http.post(url,this.cbChecked, options)
     .subscribe(
      (value:Response)=>{
         this.toastrService.success('刪除完成！', '成功');
        this.editMode = '';
        this.findAll();
      },
      (error)=>{
        this.error = error;
        this.toastrService.error(error, '失敗');
      }
     );

  }

  updateCheckedOptions(chBox, event) {
      var cbIdx = this.cbChecked.indexOf(chBox);
      if(event.target.checked) {
          if(cbIdx < 0 )
            this.cbChecked.push(chBox);
      } else {
          if(cbIdx >= 0 )
            this.cbChecked.splice(cbIdx,1);
      }
  }

  /*findAll(): Observable<any> {
    return this.http.get(this.findAllUrl)
      .map((r: Response) => r.json());
  }*/

  findAll(page: number=1) {
    let url:string=this.findAllUrl;
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers:headers});
    page = page - 1;
    let params = {page: page, size: Number(this.pageSize)};
    let jData:Observable<any>;
    this.blockUI.start();
    jData = this.http.post(url, params, options)
    .map(
      (value:Response)=>value.json()
    );
    jData.subscribe((value)=>{
      console.info(value);
      this.datas = value.content;
      this.paginate = {
        totalPages: value.totalPages,
        size: value.size,
        totalElements: value.totalElements,
        page: value.number,
      };
      console.info(this.paginate);
      this.set_pageNumArray();
    })

    this.blockUI.stop();
  }

  //  設定分頁控制項的陣列
  set_pageNumArray(){
      //初始劃分頁陣列
        this.pageNumArray=[];
        let i:number=0;

        //計算起始頁
        this.startPg = Math.floor((this.paginate.page+1)/10)*10+1;

        if (this.startPg+10 > this.paginate.totalPages){
          this.pageNumArrayMax = this.paginate.totalPages;
        } else {
          this.pageNumArrayMax = this.startPg + 10 -1;
        }
        for (i = this.startPg; i <= this.pageNumArrayMax; i++){
            this.pageNumArray.push(i);
        }
        console.info(this.startPg);
        console.info(this.pageNumArrayMax);
        console.info(this.pageNumArray);
  }

}
