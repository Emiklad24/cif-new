import {
  Input,
  Button
} from 'antd';

const ClientName = () => {
  return (
    <div>
    <Input.Group compact >
      <Input style={{ width: 'calc(110% - 100px)' }} placeholder="Enter Client Name" />
      <Button type="primary">Apply</Button>
    </Input.Group>
    </div>
  )
}

export default ClientName