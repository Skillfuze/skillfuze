## Examples

### Basic Usage

```jsx
<div className="container max-w-xs">
  <ContentCard
    thumbnail="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg" 
    category="Nature"
    title="AWS Certified Developer Associate 2020"
    userName="Karim Elsayed"
    createdAt="2020-05-17 13:55:53.970572"
    userAvatar="https://www.w3schools.com/w3images/avatar2.png"
   />
</div>
```
### Course card Example

```jsx
import Button from '../Button';
import CourseInfoBar from './components/CourseInfoBar';
<div className="container max-w-xs">
  <ContentCard
    thumbnail="https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png" 
    category="IT & Software"
    title="AWS Certified Developer - Associate 2020"
    userName="Karim Elsayed"
    userAvatar="https://www.w3schools.com/w3images/avatar2.png"
    createdAt="2020-05-17 13:55:53.970572"
    infoBar={<CourseInfoBar rate={4.5} />}
    callToActionButton={<Button>ENROLL</Button>}
   />
   </div>
```
### Videos Card Example

```jsx
import VideosTopBar from './components/VideosTopBar';
<div className="container max-w-xs">
  <ContentCard
    thumbnail="https://pixlr.com/photo/image-editing-20200512-pw.jpg" 
    category="Photography"
    title="AWS Certified Developer Associate 2020"
    userName="Karim Elsayed"
    userAvatar="https://www.w3schools.com/w3images/avatar2.png"    
    createdAt="2020-05-17 13:55:53.970572"
    topBar={<VideosTopBar views={102} />}
   />
   </div>
```
### Livestreams Card Example

```jsx
import VideosTopBar from './components/VideosTopBar';
<div className="container max-w-xs">
  <ContentCard
    thumbnail="https://image.freepik.com/free-photo/image-human-brain_99433-298.jpg" 
    category="Photography"
    title="AWS Certified Developer Associate 2020"
    userName="Karim Elsayed"
    userAvatar="https://www.w3schools.com/w3images/avatar2.png"    
    topBar={<VideosTopBar isLive={true} views={102} />}
   />
   </div>
```
### Blogs Card Example

```jsx
<div className="container max-w-xs">
  <ContentCard
    thumbnail="https://i.ytimg.com/vi/EwBK_cXUTZI/maxresdefault.jpg" 
    category="Photography"
    title="AWS Certified Developer Associate 2020"
    description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor."
    userName="Karim Elsayed"
    userAvatar="https://www.w3schools.com/w3images/avatar2.png"    
    createdAt="2020-05-17 13:55:53.970572"
   />
   </div>
```