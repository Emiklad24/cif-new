import {
  Input,
  Button
} from 'antd';

const DateOfBirth = () => {
  return (
    <div>
    <Input.Group compact>
      <Input style={{ width: 'calc(110% - 100px)' }} placeholder="Enter Date Of Birth" />
      <Button type="primary">Apply</Button>
    </Input.Group>
    </div>
  )
}

export default DateOfBirth