import { Button, Form, Input, Select } from 'antd';
import useSongs from '../hooks/useSongs';

export const EditForm = ({ id, setModal }: { id: string; setModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
  interface IFormData {
    title: string;
    artist: string;
    key: string;
  }

  const { setSubmitted, submitted, songList } = useSongs();

  const idx = songList.findIndex(song => song.id === id);

  const [form] = Form.useForm();

  const onFinish = async (values: IFormData) => {
    try {
      const response = await fetch(`http://localhost:8089/songs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      response.ok
        ? console.log('Form sent to backend!')
        : console.log('Form failed!');

      setSubmitted(!submitted);

      setModal(false);

    } catch (err) {
      console.log(err);
    }
  };

  const keys = [
    'C major',
    'G major',
    'D major',
    'A major',
    'E major',
    'B major',
    'F♯ major',
    'C♯ major',
    'F major',
    'B♭ major',
    'E♭ major',
    'A♭ major',
    'D♭ major',
    'G♭ major',
    'C♭ major',
    'A minor',
    'E minor',
    'B minor',
    'F♯ minor',
    'C♯ minor',
    'G♯ minor',
    'D♯ minor',
    'A♯ minor',
    'D minor',
    'G minor',
    'C minor',
    'F minor',
    'B♭ minor',
    'E♭ minor',
    'A♭ minor',
    'Chromatic'
  ];

  return (
    <Form <IFormData>
      onFinish={onFinish}
      layout='vertical'
      style={{
        width: '100%',
      }}
      form={form}
    >
      <Form.Item
        name='title'
        label='Song title'
        initialValue={songList[idx].title || ''}
        rules={[{
          required: true,
          message: 'Plese input the song title!',
        }]}
      >
        <Input placeholder="I'm still standing" />
      </Form.Item>
      <Form.Item
        name='artist'
        label='Artist'
        initialValue={songList[idx].artist || ''}
        rules={[{
          required: true,
          message: 'Plese input the artist!',
        }]}
      >
        <Input placeholder='Elton John' />
      </Form.Item>
      <Form.Item
        name='key'
        label='Key'
        initialValue={songList[idx].key || 'B♭ major'}
        rules={[{
          required: true,
          message: 'Plese input the key!',
        }]}
      >
        <Select
          showSearch
          placeholder='B♭ major'
          options={keys.map(key => ({ value: key, label: <span>{key}</span> }))}
        />
      </Form.Item>
      <Button
        type='primary'
        htmlType='submit'
      >
        Update
      </Button>
    </Form>
  )
}

