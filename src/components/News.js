import React from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd'
import moment from 'moment'
import { useSelector } from 'react-redux'
import alternameImg from '../images/alternateNewImg.svg'
import Loader from './Loader'
import cnnNewsImg from '../images/cnn.jpg'


const { Title, Text } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
    const count = simplified ? 10 : 20;
    const { data } = useSelector((state) => state.crypto);
    const { coins } = data ? data : [];
    const { cryptoNews, isLoading } = useSelector((state) => state.cryptoNews);
    const cryptosNews = cryptoNews?.data;
    console.log(cryptosNews)

    if (isLoading) return <Loader />


    return (
        <Row gutter={[24, 24]}>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className='select-news'
                        placeholder='Select a Crypto'
                        optionFilterProp='children'
                        onChange={(value) => value}
                        filterOption={(input, option) =>
                            option && option.children &&
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value='Cryptocurrency'>Cryptocurrency</Option>
                        {coins?.map((coin) => <Option value={coin?.name}>{coin?.name}</Option>)}
                    </Select>
                </Col>
            )}
            {cryptosNews?.slice(0, count)?.map((news, i) =>
                <Col xs={24} sm={12} lg={8} key={i}>
                    <Card hoverable className='news-card'>
                        <a href={news.url} target='_black' rel='noreferrer'>
                            <div className='news-image-container'>
                                <Title className='news-title' level={4}>{news.title.slice(0, 20)}</Title>
                                <img style={{ width: '100px', height: '100px' }} src={news.thumb_2x || alternameImg || 'https://cdn.mos.cms.futurecdn.net/aNSyW6WY7t2j9fMrzaPPVb-1200-80.jpeg'} alt='news' />
                            </div>
                            <p>
                                {news.description.slice(0, 150)}
                            </p>
                            <div className='provider-container'>
                                <div>
                                    <Avatar src={cnnNewsImg} />
                                    {/* <Text className='provider-name'>{news.author}</Text> */}
                                </div>
                                <Text>{moment(news.publishedAt).startOf('ss').fromNow()}</Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            )}
        </Row>
    )
}

export default News