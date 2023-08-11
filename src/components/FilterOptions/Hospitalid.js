import {
  Input,
  Button
} from 'antd';

const Hospitalid = () => {
  return (
    <div>
    <Input.Group compact>
      <Input style={{ width: 'calc(110% - 100px)' }} placeholder="Enter Hospital ID" />
      <Button type="primary">Apply</Button>
    </Input.Group>
    </div>
  )
}

export default Hospitalid