## Examples

### Basic Usage

```jsx
const [tags, setTags] = React.useState(['Tag 1', 'Tag 2']);

<div className="container">
  <TagsInput tags={tags} onChange={setTags} limit={5} />
</div>
```
