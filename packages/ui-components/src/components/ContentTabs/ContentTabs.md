## Examples

### Basic Usage

```jsx
import { Tab } from './Tab';

const loadMore = async () => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), 3000);
  });
}

<div className="container">
  <ContentTabs tabs={["Courses", "Videos", "Blogs", "Livestreams"]} loadMore={loadMore} enableMore>
    <Tab title="Courses">
      <p>Courses Tab</p>
    </Tab>
    <Tab title="Videos">
      <p>Videos Tab</p>
    </Tab>
    <Tab title="Blogs">
      <p>Blogs Tab</p>
    </Tab>
    <Tab title="Livestreams">
      <p>Livestreams Tab</p>
    </Tab>
  </ContentTabs>
</div>
```
