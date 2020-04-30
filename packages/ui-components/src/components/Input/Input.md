## Examples

### Basic Usage

```jsx
<div className="container">
  <Input label="Email" type="text" placeholder="example@gmail.com"/>
  <Input type="text" placeholder="Email"/>
  <Input type="text" disabled={true} value="123456789"/>

  <Input type="text" placeholder="borderless@gmail.com" borderless={true} />
</div>
```

### State Variants

```jsx
<div className="container">
  <Input label="Email" type="text" placeholder="example@gmail.com" error="Invalid Email"/>
</div>
```
