import {
  Input,
  Button
} from 'antd';

const FacilityName = () => {
  return (
    <div>
    <Input.Group compact>
      <Input style={{ width: 'calc(110% - 100px)' }} placeholder="Enter Facility Name" />
      <Button type="primary">Apply</Button>
    </Input.Group>
    </div>
  )
}

export default FacilityName