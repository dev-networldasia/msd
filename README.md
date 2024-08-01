**I. CÁCH DÙNG TEMPLATE PROJECT**

****STRUCTURE** FOLDER:**

* **Root** *.html là file của từng page độc lập
* **CSS** folder chứa toàn bộ css của project
  * **Base** chứa các cài đặt CSS base cho project
  * **Grid** chứa CSS grid
  * **Layout** chứa CSS cho layout của website
  * **Pages** chứa CSS cho từng trang
* **Fronts**: chứa font cho website (tạm thời dùng từ CDN google)
* **Images**: chứa toàn bộ ảnh và icon của project
  * **Common** chứa các hình ảnh chung dùng ở toàn bộ website
  * **Icons** chưa các icon của toàn bộ website và được phần thành 2 nhóm
    * Png
    * SVG: dùng duy nhất 1 file index.html
      * Cách tạo file: copy code "svg" của icon và gắn id cho icon tương tự như icon search(mẫu)
      * Cách dùng file svg:
        * "#search" đây chính là id của icon mình muốn dùng,
        * Để đổi màu icon chỉ cần CSS ***"svg{ color: red }"***
        * Để thay đỏi size icon chỉ cần CSS ***"svg{ font-size: 40px }"***
      * ```
        <svg xmlns:xlink="http://www.w3.org/1999/xlink">
                    <use xlink:href="#search" fill="currentColor" />
                 </svg>
        ```
  * **Page**: ảnh chỉ dùng riêng cho mỗi page
* **JS:** chứa file js cho project
  * **Data**: chứa data render cho các component html
  * **Layout**: chứa file js layout của website
  * **Pages**: chưa files js của page
  * **Lib**: chứa file js của các plugin or thư viện
  * **index.js** là chứa các function components helper
* **Layout**: chứa các file html layout của website
* **Pages**: chứa các file html của mỗi page và được nhóm theo folder của từng page


**II. Các thành phần chính của file Page.index:**

* **Title page**: sửa tên title page theo từng page
* **Load asse**t bắt buộc cho website:

  * **Dòng 14** load CSS main for website (bắt buộc cho tất cả page)
  * **Dòng 17** load Hard Data  cho từng page
  * **Dòng 20**  load JS Utils for website (bắt buộc cho tất cả page)
* **Layout** cố định của website:

  ![1722487196070](image/readme/1722487196070.png)

**III. CSS:**

* Viết CSS bằng SCSS:
* Công cụ compiler: cài extension "Live Sass Compiler"
* Định dạng file:
  * nameFile.scss -> nameFile.css
  * _nameFile.scss -> không compile
* Basic Syntax:

```
SCSS
.header{
    .nav-menu{
  	ul{
	   padding: 0;
	}
    }
}

*Compile to CSS

.header .nav-menu ul {
     padding: 0;
}
```


---



```
.header{
    .nav-menu{
  	&ul{
	   padding: 0;
	}
    }
}

*Compile to CSS

.header ul.nav-menu {
     padding: 0;
}
```

---

```
import file SCSS
@import './path/nameFile';
```
