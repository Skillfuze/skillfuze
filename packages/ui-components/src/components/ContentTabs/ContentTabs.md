## Examples

### Basic Usage

```jsx
import Tab from './Tab';

const loadMore = async () => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), 3000);
  });
}

<div className="container">
  <ContentTabs tabs={["Courses", "Videos", "Blogs", "Livestreams"]}>
    <Tab enableMore loadMore={loadMore} title="Courses">
      <p>Courses Tab</p>
    </Tab>
    <Tab enableMore loadMore={loadMore} title="Videos">
      <p>Videos Tab</p>
    </Tab>
    <Tab enableMore loadMore={loadMore} title="Blogs">
      <p>Blogs Tab</p>
    </Tab>
    <Tab enableMore loadMore={loadMore} title="Livestreams">
      <p>Livestreams Tab</p>
    </Tab>
  </ContentTabs>
</div>
```
