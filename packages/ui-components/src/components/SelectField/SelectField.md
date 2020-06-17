## Examples

### Basic Usage

```jsx
const [selected, setSelected] = React.useState();
const options = [{ value: { id: 1, name: 'Option 1' }, label: 'Option 1' },{ value: { id: 2, name: 'Option 2'}, label: 'Option 2' }];

<div className="container">
  You Selected: {selected && selected.value.name}
  <SelectField value={selected} onChange={setSelected} options={options} placeholder="Select your option" />
  <br />
  <SelectField label="Disabled" value={selected} disabled onChange={setSelected} options={options} placeholder="Select your option" />
  <br />
  <SelectField label="With Error" value={selected} onChange={setSelected} options={options} placeholder="Select your option" error="Invalid Value" />
</div>
```
