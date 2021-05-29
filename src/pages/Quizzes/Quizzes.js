import React, { Component } from 'react';
import { Card, Typography, Radio, Space, Button, Result, Statistic, Modal, Spin, Tag, Form, Select, Alert } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import QuizzzesWrapper from './Quizzes.style';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const quizList = [
    {
        "id": "60a29d21f8e26b1a947a4889",
        "createdAt": "May 29, 2021",
        "questionList": [
            {
                "id": 1,
                "text": "368 X 25",
                "options": [
                    {
                        "id": 1,
                        "text": "9100"
                    },
                    {
                        "id": 2,
                        "text": "9200"
                    },
                    {
                        "id": 3,
                        "text": "9300"
                    },
                    {
                        "id": 4,
                        "text": "9400"
                    }
                ],
                "correctOption": 2
            },
            {
                "id": 2,
                "text": "772 X 125",
                "options": [
                    {
                        "id": 1,
                        "text": "96000"
                    },
                    {
                        "id": 2,
                        "text": "96500"
                    },
                    {
                        "id": 3,
                        "text": "97000"
                    },
                    {
                        "id": 4,
                        "text": "95500"
                    }
                ],
                "correctOption": 2
            },
            {
                "id": 3,
                "text": "468 X 625",
                "options": [
                    {
                        "id": 1,
                        "text": "192500"
                    },
                    {
                        "id": 2,
                        "text": "392500"
                    },
                    {
                        "id": 3,
                        "text": "292500"
                    },
                    {
                        "id": 4,
                        "text": "292000"
                    }
                ],
                "correctOption": 3
            },
            {
                "id": 4,
                "text": "9867 X 9",
                "options": [
                    {
                        "id": 1,
                        "text": "88003"
                    },
                    {
                        "id": 2,
                        "text": "88203"
                    },
                    {
                        "id": 3,
                        "text": "88803"
                    },
                    {
                        "id": 4,
                        "text": "88403"
                    }
                ],
                "correctOption": 3
            },
            {
                "id": 5,
                "text": "3246 X 5",
                "options": [
                    {
                        "id": 1,
                        "text": "16230"
                    },
                    {
                        "id": 2,
                        "text": "16330"
                    },
                    {
                        "id": 3,
                        "text": "16000"
                    },
                    {
                        "id": 4,
                        "text": "18000"
                    }
                ],
                "correctOption": 1
            },
            {
                "id": 6,
                "text": "242 X 81",
                "options": [
                    {
                        "id": 1,
                        "text": "19602"
                    },
                    {
                        "id": 2,
                        "text": "19802"
                    },
                    {
                        "id": 3,
                        "text": "19700"
                    },
                    {
                        "id": 4,
                        "text": "19900"
                    }
                ],
                "correctOption": 1
            },
            {
                "id": 7,
                "text": "68 X 62",
                "options": [
                    {
                        "id": 1,
                        "text": "4210"
                    },
                    {
                        "id": 2,
                        "text": "4215"
                    },
                    {
                        "id": 3,
                        "text": "4216"
                    },
                    {
                        "id": 4,
                        "text": "4226"
                    }
                ],
                "correctOption": 3
            },
            {
                "id": 8,
                "text": "124 X 126",
                "options": [
                    {
                        "id": 1,
                        "text": "15634"
                    },
                    {
                        "id": 2,
                        "text": "15624"
                    },
                    {
                        "id": 3,
                        "text": "15644"
                    },
                    {
                        "id": 4,
                        "text": "15654"
                    }
                ],
                "correctOption": 2
            },
            {
                "id": 9,
                "text": "142 X 148",
                "options": [
                    {
                        "id": 1,
                        "text": "21016"
                    },
                    {
                        "id": 2,
                        "text": "22016"
                    },
                    {
                        "id": 3,
                        "text": "12016"
                    },
                    {
                        "id": 4,
                        "text": "22016"
                    }
                ],
                "correctOption": 1
            },
            {
                "id": 10,
                "text": "174 X 176",
                "options": [
                    {
                        "id": 1,
                        "text": "29624"
                    },
                    {
                        "id": 2,
                        "text": "28624"
                    },
                    {
                        "id": 3,
                        "text": "30624"
                    },
                    {
                        "id": 4,
                        "text": "31624"
                    }
                ],
                "correctOption": 3
            },
            {
                "id": 11,
                "text": "192 X 198",
                "options": [
                    {
                        "id": 1,
                        "text": "38016"
                    },
                    {
                        "id": 2,
                        "text": "37016"
                    },
                    {
                        "id": 3,
                        "text": "36016"
                    },
                    {
                        "id": 4,
                        "text": "35016"
                    }
                ],
                "correctOption": 1
            }, {
                "id": 12,
                "text": "36 X 56",
                "options": [
                    {
                        "id": 1,
                        "text": "2116"
                    },
                    {
                        "id": 2,
                        "text": "2216"
                    },
                    {
                        "id": 3,
                        "text": "2316"
                    },
                    {
                        "id": 4,
                        "text": "2016"
                    }
                ],
                "correctOption": 4
            }, {
                "id": 13,
                "text": "52 X 78",
                "options": [
                    {
                        "id": 1,
                        "text": "4156"
                    },
                    {
                        "id": 2,
                        "text": "4056"
                    },
                    {
                        "id": 3,
                        "text": "4256"
                    },
                    {
                        "id": 4,
                        "text": "4356"
                    }
                ],
                "correctOption": 2
            }, {
                "id": 14,
                "text": "78 X 104",
                "options": [
                    {
                        "id": 1,
                        "text": "8012"
                    },
                    {
                        "id": 2,
                        "text": "8112"
                    },
                    {
                        "id": 3,
                        "text": "8212"
                    },
                    {
                        "id": 4,
                        "text": "8312"
                    }
                ],
                "correctOption": 2
            }, {
                "id": 15,
                "text": "46 X 60",
                "options": [
                    {
                        "id": 1,
                        "text": "2760"
                    },
                    {
                        "id": 2,
                        "text": "2660"
                    },
                    {
                        "id": 3,
                        "text": "2860"
                    },
                    {
                        "id": 4,
                        "text": "6760"
                    }
                ],
                "correctOption": 1
            }, {
                "id": 16,
                "text": "27 X 86",
                "options": [
                    {
                        "id": 1,
                        "text": "2322"
                    },
                    {
                        "id": 2,
                        "text": "2422"
                    },
                    {
                        "id": 3,
                        "text": "2522"
                    },
                    {
                        "id": 4,
                        "text": "2622"
                    }
                ],
                "correctOption": 1
            }, {
                "id": 17,
                "text": "193 X 24",
                "options": [
                    {
                        "id": 1,
                        "text": "4832"
                    },
                    {
                        "id": 2,
                        "text": "4632"
                    },
                    {
                        "id": 3,
                        "text": "4732"
                    },
                    {
                        "id": 4,
                        "text": "5032"
                    }
                ],
                "correctOption": 2
            }, {
                "id": 18,
                "text": "167 X 86",
                "options": [
                    {
                        "id": 1,
                        "text": "14462"
                    },
                    {
                        "id": 2,
                        "text": "14562"
                    },
                    {
                        "id": 3,
                        "text": "14362"
                    },
                    {
                        "id": 4,
                        "text": "14962"
                    }
                ],
                "correctOption": 3
            }, {
                "id": 19,
                "text": "145 X 242",
                "options": [
                    {
                        "id": 1,
                        "text": "36090"
                    },
                    {
                        "id": 2,
                        "text": "35090"
                    },
                    {
                        "id": 3,
                        "text": "33090"
                    },
                    {
                        "id": 4,
                        "text": "87090"
                    }
                ],
                "correctOption": 2
            }, {
                "id": 20,
                "text": "243 X 567",
                "options": [
                    {
                        "id": 1,
                        "text": "137681"
                    },
                    {
                        "id": 2,
                        "text": "137881"
                    },
                    {
                        "id": 3,
                        "text": "137781"
                    },
                    {
                        "id": 4,
                        "text": "137881"
                    }
                ],
                "correctOption": 3
            }
        ]
    },
    {
        "id": "609e1cfb598a43f44ff8ae32",
        "createdAt": "May 27, 2021",
        "questionList": [
            {
                "id": 1,
                "text": "What is the square of 119 ?",
                "options": [
                    {
                        "id": 1,
                        "text": "14161"
                    },
                    {
                        "id": 2,
                        "text": "14261"
                    },
                    {
                        "id": 3,
                        "text": "14361"
                    },
                    {
                        "id": 4,
                        "text": "14461"
                    }
                ],
                "correctOption": 1
            },
            {
                "id": 2,
                "text": "What is the square of 105 ?",
                "options": [
                    {
                        "id": 1,
                        "text": "12025"
                    },
                    {
                        "id": 2,
                        "text": "11225"
                    },
                    {
                        "id": 3,
                        "text": "11325"
                    },
                    {
                        "id": 4,
                        "text": "11025"
                    }
                ],
                "correctOption": 4
            },
            {
                "id": 3,
                "text": "What is the square of 88 ?",
                "options": [
                    {
                        "id": 1,
                        "text": "7644"
                    },
                    {
                        "id": 2,
                        "text": "7544"
                    },
                    {
                        "id": 3,
                        "text": "7744"
                    },
                    {
                        "id": 4,
                        "text": "7344"
                    }
                ],
                "correctOption": 3
            },
            {
                "id": 4,
                "text": "What is the square of 83 ?",
                "options": [
                    {
                        "id": 1,
                        "text": "6689"
                    },
                    {
                        "id": 2,
                        "text": "6889"
                    },
                    {
                        "id": 3,
                        "text": "6589"
                    },
                    {
                        "id": 4,
                        "text": "6789"
                    }
                ],
                "correctOption": 2
            },
            {
                "id": 5,
                "text": "What is the square of 63 ?",
                "options": [
                    {
                        "id": 1,
                        "text": "3869"
                    },
                    {
                        "id": 2,
                        "text": "3969"
                    },
                    {
                        "id": 3,
                        "text": "4069"
                    },
                    {
                        "id": 4,
                        "text": "3979"
                    }
                ],
                "correctOption": 2
            },
            {
                "id": 6,
                "text": "What is the square root of 15129 ?",
                "options": [
                    {
                        "id": 1,
                        "text": "113"
                    },
                    {
                        "id": 2,
                        "text": "123"
                    },
                    {
                        "id": 3,
                        "text": "129"
                    },
                    {
                        "id": 4,
                        "text": "133"
                    }
                ],
                "correctOption": 2
            },
            {
                "id": 7,
                "text": "What is the square root of 25921 ?",
                "options": [
                    {
                        "id": 1,
                        "text": "169"
                    },
                    {
                        "id": 2,
                        "text": "159"
                    },
                    {
                        "id": 3,
                        "text": "161"
                    },
                    {
                        "id": 4,
                        "text": "151"
                    }
                ],
                "correctOption": 3
            },
            {
                "id": 8,
                "text": "What is square root of 22801 ?",
                "options": [
                    {
                        "id": 1,
                        "text": "161"
                    },
                    {
                        "id": 2,
                        "text": "171"
                    },
                    {
                        "id": 3,
                        "text": "169"
                    },
                    {
                        "id": 4,
                        "text": "151"
                    }
                ],
                "correctOption": 4
            },
            {
                "id": 9,
                "text": "What is the square root of 14641 ?",
                "options": [
                    {
                        "id": 1,
                        "text": "121"
                    },
                    {
                        "id": 2,
                        "text": "141"
                    },
                    {
                        "id": 3,
                        "text": "131"
                    },
                    {
                        "id": 4,
                        "text": "129"
                    }
                ],
                "correctOption": 1
            },
            {
                "id": 10,
                "text": "What is the square root of 17689 ?",
                "options": [
                    {
                        "id": 1,
                        "text": "123"
                    },
                    {
                        "id": 2,
                        "text": "133"
                    },
                    {
                        "id": 3,
                        "text": "127"
                    },
                    {
                        "id": 4,
                        "text": "137"
                    }
                ],
                "correctOption": 2
            },
            {
                "id": 11,
                "text": "What is the cube of 26 ?",
                "options": [
                    {
                        "id": 1,
                        "text": "17576"
                    },
                    {
                        "id": 2,
                        "text": "16576"
                    },
                    {
                        "id": 3,
                        "text": "11876"
                    },
                    {
                        "id": 4,
                        "text": "11976"
                    }
                ],
                "correctOption": 1
            }, {
                "id": 12,
                "text": "What is the cube of 36 ?",
                "options": [
                    {
                        "id": 1,
                        "text": "46656"
                    },
                    {
                        "id": 2,
                        "text": "45656"
                    },
                    {
                        "id": 3,
                        "text": "47656"
                    },
                    {
                        "id": 4,
                        "text": "48656"
                    }
                ],
                "correctOption": 1
            }, {
                "id": 13,
                "text": "What is the cube of 63 ?",
                "options": [
                    {
                        "id": 1,
                        "text": "250037"
                    },
                    {
                        "id": 2,
                        "text": "250047"
                    },
                    {
                        "id": 3,
                        "text": "250057"
                    },
                    {
                        "id": 4,
                        "text": "250067"
                    }
                ],
                "correctOption": 2
            }, {
                "id": 14,
                "text": "What is the cube of 56 ?",
                "options": [
                    {
                        "id": 1,
                        "text": "156616"
                    },
                    {
                        "id": 2,
                        "text": "166616"
                    },
                    {
                        "id": 3,
                        "text": "175616"
                    },
                    {
                        "id": 4,
                        "text": "185616"
                    }
                ],
                "correctOption": 3
            }, {
                "id": 15,
                "text": "What is the cube of 69 ?",
                "options": [
                    {
                        "id": 1,
                        "text": "328509"
                    },
                    {
                        "id": 2,
                        "text": "328609"
                    },
                    {
                        "id": 3,
                        "text": "329609"
                    },
                    {
                        "id": 4,
                        "text": "328999"
                    }
                ],
                "correctOption": 1
            }, {
                "id": 16,
                "text": "What is the cube root of 185193 ?",
                "options": [
                    {
                        "id": 1,
                        "text": "57"
                    },
                    {
                        "id": 2,
                        "text": "67"
                    },
                    {
                        "id": 3,
                        "text": "47"
                    },
                    {
                        "id": 4,
                        "text": "77"
                    }
                ],
                "correctOption": 1
            }, {
                "id": 17,
                "text": "What is the cube root of 250047 ?",
                "options": [
                    {
                        "id": 1,
                        "text": "63"
                    },
                    {
                        "id": 2,
                        "text": "53"
                    },
                    {
                        "id": 3,
                        "text": "73"
                    },
                    {
                        "id": 4,
                        "text": "43"
                    }
                ],
                "correctOption": 1
            }, {
                "id": 18,
                "text": "What is the cube root of 681472 ?",
                "options": [
                    {
                        "id": 1,
                        "text": "88"
                    },
                    {
                        "id": 2,
                        "text": "78"
                    },
                    {
                        "id": 3,
                        "text": "68"
                    },
                    {
                        "id": 4,
                        "text": "98"
                    }
                ],
                "correctOption": 1
            }, {
                "id": 19,
                "text": "What is the cube root of 592704 ?",
                "options": [
                    {
                        "id": 1,
                        "text": "84"
                    },
                    {
                        "id": 2,
                        "text": "74"
                    },
                    {
                        "id": 3,
                        "text": "64"
                    },
                    {
                        "id": 4,
                        "text": "94"
                    }
                ],
                "correctOption": 1
            }, {
                "id": 20,
                "text": "What is the cube root of 438976 ?",
                "options": [
                    {
                        "id": 1,
                        "text": "66"
                    },
                    {
                        "id": 2,
                        "text": "76"
                    },
                    {
                        "id": 3,
                        "text": "86"
                    },
                    {
                        "id": 4,
                        "text": "96"
                    }
                ],
                "correctOption": 2
            }
        ]
    },
    {
        "id": "60aeb5c182af3808df4a9a50",
        "createdAt": "May 26, 2021",
        "questionList": [
            {
                "id": 1,
                "text": "What is square of 127 ?",
                "options": [
                    {
                        "id": 1,
                        "text": "17129"
                    },
                    {
                        "id": 2,
                        "text": "16129"
                    },
                    {
                        "id": 3,
                        "text": "16234"
                    },
                    {
                        "id": 4,
                        "text": "16433"
                    }
                ],
                "correctOption": 2
            },
            {
                "id": 2,
                "text": "What is  square of 113 ?",
                "options": [
                    {
                        "id": 1,
                        "text": "12769"
                    },
                    {
                        "id": 2,
                        "text": "13465"
                    },
                    {
                        "id": 3,
                        "text": "12768"
                    },
                    {
                        "id": 4,
                        "text": "12786"
                    }
                ],
                "correctOption": 1
            },
            {
                "id": 3,
                "text": "What is sqare of 108 ?",
                "options": [
                    {
                        "id": 1,
                        "text": "11664"
                    },
                    {
                        "id": 2,
                        "text": "11672"
                    },
                    {
                        "id": 3,
                        "text": "12344"
                    },
                    {
                        "id": 4,
                        "text": "19343"
                    }
                ],
                "correctOption": 1
            },
            {
                "id": 4,
                "text": "64 x 78 =  ?",
                "options": [
                    {
                        "id": 1,
                        "text": "4988"
                    },
                    {
                        "id": 2,
                        "text": "4888"
                    },
                    {
                        "id": 3,
                        "text": "4992"
                    },
                    {
                        "id": 4,
                        "text": "6732"
                    }
                ],
                "correctOption": 3
            },
            {
                "id": 5,
                "text": "42 x 58 = ?",
                "options": [
                    {
                        "id": 1,
                        "text": "2436"
                    },
                    {
                        "id": 2,
                        "text": "2536"
                    },
                    {
                        "id": 3,
                        "text": "2636"
                    },
                    {
                        "id": 4,
                        "text": "2736"
                    }
                ],
                "correctOption": 1
            },
            {
                "id": 6,
                "text": "84 x 62 =  ?",
                "options": [
                    {
                        "id": 1,
                        "text": "5228"
                    },
                    {
                        "id": 2,
                        "text": "5308"
                    },
                    {
                        "id": 3,
                        "text": "5408"
                    },
                    {
                        "id": 4,
                        "text": "5208"
                    }
                ],
                "correctOption": 4
            },
            {
                "id": 7,
                "text": "What is square root of 20164  ?",
                "options": [
                    {
                        "id": 1,
                        "text": "148"
                    },
                    {
                        "id": 2,
                        "text": "158"
                    },
                    {
                        "id": 3,
                        "text": "142"
                    },
                    {
                        "id": 4,
                        "text": "138"
                    }
                ],
                "correctOption": 3
            },
            {
                "id": 8,
                "text": "What is square root of 7569 ?",
                "options": [
                    {
                        "id": 1,
                        "text": "83"
                    },
                    {
                        "id": 2,
                        "text": "87"
                    },
                    {
                        "id": 3,
                        "text": "77"
                    },
                    {
                        "id": 4,
                        "text": "63"
                    }
                ],
                "correctOption": 2
            },
            {
                "id": 9,
                "text": "What is square root of 38416 ?",
                "options": [
                    {
                        "id": 1,
                        "text": "186"
                    },
                    {
                        "id": 2,
                        "text": "184"
                    },
                    {
                        "id": 3,
                        "text": "194"
                    },
                    {
                        "id": 4,
                        "text": "196"
                    }
                ],
                "correctOption": 4
            },
            {
                "id": 10,
                "text": "What is  square root of 47961 ?",
                "options": [
                    {
                        "id": 1,
                        "text": "221"
                    },
                    {
                        "id": 2,
                        "text": "219"
                    },
                    {
                        "id": 3,
                        "text": "229"
                    },
                    {
                        "id": 4,
                        "text": "231"
                    }
                ],
                "correctOption": 2
            }
        ]
    },
    {
        "id": "60aeb5edf77ca90903e0476e",
        "createdAt": "May 25, 2021",
        "questionList": [
            {
                "id": 1,
                "text": " A shopkeeper earns a profit of 12% on selling a book at 10%  discount on the printed price. The ratio for the cost price and  the printed price of the book is",
                "options": [
                    {
                        "id": 1,
                        "text": "45:46"
                    },
                    {
                        "id": 2,
                        "text": "45:51"
                    },
                    {
                        "id": 3,
                        "text": "47:56"
                    },
                    {
                        "id": 4,
                        "text": "47:51"
                    }
                ],
                "correctOption": 3
            },
            {
                "id": 2,
                "text": "A manufacturer marked an article at `50 and sold it allowing  20% discount. If his profit was 25% then the cost price of the  article was?",
                "options": [
                    {
                        "id": 1,
                        "text": "40"
                    },
                    {
                        "id": 2,
                        "text": "35"
                    },
                    {
                        "id": 3,
                        "text": "32"
                    },
                    {
                        "id": 4,
                        "text": "30"
                    }
                ],
                "correctOption": 3
            },
            {
                "id": 3,
                "text": "If on a marked price, the difference of selling prices with a  discount of 30% and two successive discounts of 20% and  10% is ` 72, then the marked price (in rupees) is  ?",
                "options": [
                    {
                        "id": 1,
                        "text": "3600"
                    },
                    {
                        "id": 2,
                        "text": "3000"
                    },
                    {
                        "id": 3,
                        "text": "2500"
                    },
                    {
                        "id": 4,
                        "text": "2400"
                    }
                ],
                "correctOption": 3
            },
            {
                "id": 4,
                "text": "When the price of sugar decreases by 10%, a man could buy  1 kg more for ` 270. Then the original price of sugar per kg is ?",
                "options": [
                    {
                        "id": 1,
                        "text": "25"
                    },
                    {
                        "id": 2,
                        "text": "30"
                    },
                    {
                        "id": 3,
                        "text": "27"
                    },
                    {
                        "id": 4,
                        "text": "32"
                    }
                ],
                "correctOption": 2
            },
            {
                "id": 5,
                "text": "X sells two articles for ` 4,000 each with no loss and no gain  in the interaction. If one was sold at a gain of 25% the other  is sold at a loss of",
                "options": [
                    {
                        "id": 1,
                        "text": "25%"
                    },
                    {
                        "id": 2,
                        "text": "20%"
                    },
                    {
                        "id": 3,
                        "text": "(50/3)%"
                    },
                    {
                        "id": 4,
                        "text": "15%"
                    }
                ],
                "correctOption": 3
            },
            {
                "id": 6,
                "text": " A reduction of 20% in the price of sugar enables me to  purchase 5 kg more for ` 600. Find the price of sugar per kg  before reduction of price ",
                "options": [
                    {
                        "id": 1,
                        "text": "24"
                    },
                    {
                        "id": 2,
                        "text": "30"
                    },
                    {
                        "id": 3,
                        "text": "32"
                    },
                    {
                        "id": 4,
                        "text": "36"
                    }
                ],
                "correctOption": 2
            },
            {
                "id": 7,
                "text": " A trader has a weighing balance that shows 1,200 gm for a  kilogram. He further marks up his cost price by 10%. Then  the net profit percentage is",
                "options": [
                    {
                        "id": 1,
                        "text": "32%"
                    },
                    {
                        "id": 2,
                        "text": "23%"
                    },
                    {
                        "id": 3,
                        "text": "31.75%"
                    },
                    {
                        "id": 4,
                        "text": "23.75%"
                    }
                ],
                "correctOption": 1
            },
            {
                "id": 8,
                "text": " The monthly salaries of A and B together amount to ` 40,000.  A spends 85% of his salary and B, 95% of his salary. If now  their savings are the same, then the salary (in `) of A is ",
                "options": [
                    {
                        "id": 1,
                        "text": "10000"
                    },
                    {
                        "id": 2,
                        "text": "12000"
                    },
                    {
                        "id": 3,
                        "text": "16000"
                    },
                    {
                        "id": 4,
                        "text": "18000"
                    }
                ],
                "correctOption": 1
            },
            {
                "id": 9,
                "text": " 36. The printed price of a book is ` 320. A retailer pays ` 244.80  for it. He gets successive discounts of 10% and an another  rate. His second rate is:   ",
                "options": [
                    {
                        "id": 1,
                        "text": "15%"
                    },
                    {
                        "id": 2,
                        "text": "16%"
                    },
                    {
                        "id": 3,
                        "text": "14%"
                    },
                    {
                        "id": 4,
                        "text": "12%"
                    }
                ],
                "correctOption": 1
            },
            {
                "id": 10,
                "text": " A fruit seller buys some oranges at the rate of 4 for ` 10 and  an equal number more at 5 for ` 10. He sells the whole lot at  9 for ` 20. What is his loss or gain percent? ",
                "options": [
                    {
                        "id": 1,
                        "text": " Loss percent 1(19/81)%  "
                    },
                    {
                        "id": 2,
                        "text": "Gain percent 1(19/81)%"
                    },
                    {
                        "id": 3,
                        "text": "No profit no loss"
                    },
                    {
                        "id": 4,
                        "text": "Loss of 2 %"
                    }
                ],
                "correctOption": 1
            }
        ]
    },
    {
        "id": "60aeb5d4633b3f08ee3d25c1",
        "createdAt": "May 24, 2021",
        "questionList": [
            {
                "id": 1,
                "text": "If an electricity bill is paid before due date, one gets a  reduction of 4% on the amount of the bill. By paying the bill  before due date a person got a reduction of ` 13. The amount  of his electricity bill was",
                "options": [
                    {
                        "id": 1,
                        "text": "Rs. 125"
                    },
                    {
                        "id": 2,
                        "text": "Rs. 225"
                    },
                    {
                        "id": 3,
                        "text": "Rs. 325"
                    },
                    {
                        "id": 4,
                        "text": "Rs. 425"
                    }
                ],
                "correctOption": 3
            },
            {
                "id": 2,
                "text": "A certain amount of money is divided among x, y and z. If x  receives 25% more than y and y receives 25% less than z,  then x: y: z is equal to?",
                "options": [
                    {
                        "id": 1,
                        "text": "12:10:11"
                    },
                    {
                        "id": 2,
                        "text": "14:12:13"
                    },
                    {
                        "id": 3,
                        "text": "15:12:16"
                    },
                    {
                        "id": 4,
                        "text": "10:9:12"
                    }
                ],
                "correctOption": 3
            },
            {
                "id": 3,
                "text": "72% of the students of a certain class took Biology and  44% took Mathematics. If each student took Biology or  Mathematics and 40 took both, the total number of students  in the class was?",
                "options": [
                    {
                        "id": 1,
                        "text": "200"
                    },
                    {
                        "id": 2,
                        "text": "210"
                    },
                    {
                        "id": 3,
                        "text": "230"
                    },
                    {
                        "id": 4,
                        "text": "250"
                    }
                ],
                "correctOption": 4
            },
            {
                "id": 4,
                "text": "Two persons contested an election of Parliament. The  winning candidate secured 57% of the total votes polled  and won by a majority of 42,000 votes. The number of total  votes polled is?",
                "options": [
                    {
                        "id": 1,
                        "text": "400000"
                    },
                    {
                        "id": 2,
                        "text": "500000"
                    },
                    {
                        "id": 3,
                        "text": "600000"
                    },
                    {
                        "id": 4,
                        "text": "300000"
                    }
                ],
                "correctOption": 4
            },
            {
                "id": 5,
                "text": "In a big garden 60% of the trees are coconut trees, 25% of  the number of coconut trees are mango trees and 20% of  the number of mango trees are apple trees. If the number of  apple trees are 1500. then the number of trees in the garden  is:?",
                "options": [
                    {
                        "id": 1,
                        "text": "48000"
                    },
                    {
                        "id": 2,
                        "text": "51000"
                    },
                    {
                        "id": 3,
                        "text": "45000"
                    },
                    {
                        "id": 4,
                        "text": "50000"
                    }
                ],
                "correctOption": 4
            },
            {
                "id": 6,
                "text": "In an examination, a student must get 36% marks to pass. A  student who gets 190 marks failed by 35 marks. The total  marks in that examination is: ",
                "options": [
                    {
                        "id": 1,
                        "text": "500"
                    },
                    {
                        "id": 2,
                        "text": "625"
                    },
                    {
                        "id": 3,
                        "text": "810"
                    },
                    {
                        "id": 4,
                        "text": "550"
                    }
                ],
                "correctOption": 2
            },
            {
                "id": 7,
                "text": "In a motor of 120 machine parts, 5% parts were defective. In  another motor of 80 machine parts, 10% parts were defective.  For the two motors considered together, the percentage of  defective machine parts were",
                "options": [
                    {
                        "id": 1,
                        "text": "6.5"
                    },
                    {
                        "id": 2,
                        "text": "7"
                    },
                    {
                        "id": 3,
                        "text": "7.5"
                    },
                    {
                        "id": 4,
                        "text": "8"
                    }
                ],
                "correctOption": 2
            },
            {
                "id": 8,
                "text": "The monthly salaries of A and B together amount to ` 40,000.  A spends 85% of his salary and B, 95% of his salary. If now  their savings are the same, then the salary (in `) of A is ",
                "options": [
                    {
                        "id": 1,
                        "text": "10000"
                    },
                    {
                        "id": 2,
                        "text": "12000"
                    },
                    {
                        "id": 3,
                        "text": "16000"
                    },
                    {
                        "id": 4,
                        "text": "18000"
                    }
                ],
                "correctOption": 1
            },
            {
                "id": 9,
                "text": "80 litre mixture of milk and water contains 10% milk. How  much milk (in litres) must be added to make water percentage  in the mixture as 80%?  ",
                "options": [
                    {
                        "id": 1,
                        "text": "8"
                    },
                    {
                        "id": 2,
                        "text": "9"
                    },
                    {
                        "id": 3,
                        "text": "10"
                    },
                    {
                        "id": 4,
                        "text": "12"
                    }
                ],
                "correctOption": 3
            },
            {
                "id": 10,
                "text": "The population of a city increases at the rate of 5% per  annum. If the present population of the city is 3,70,440.  It population 3 years ago was: ",
                "options": [
                    {
                        "id": 1,
                        "text": "280000"
                    },
                    {
                        "id": 2,
                        "text": "360000"
                    },
                    {
                        "id": 3,
                        "text": "320000"
                    },
                    {
                        "id": 4,
                        "text": "300000"
                    }
                ],
                "correctOption": 3
            }
        ]
    },
]

class Quizzes extends Component {
    state = {
        quizList: [],
        selectedQuiz: null,
        submission: {},
        isSubmitted: false,
        score: 0,
        scoreLoading: false,
    };

    getScore = async (quizId) => {
        try {
            const res = await axios.get(`/score/${quizId}`);
            const data = res.data.score;
            this.setState({ score: data.score, isSubmitted: true, submission: data.submission || {} })
        } catch (e) {
            console.log(e);
        }
    }

    async componentDidMount() {
        try {
            this.setState({
                quizList,
                selectedQuiz: quizList[0]
            })
            if (this.props.user) {
                this.getScore(quizList[0].id)
            }
        } catch (e) {
            console.log(e);
        }
    }

    onChange = (e, key) => {
        this.setState({
            submission: {
                ...this.state.submission,
                [key]: e.target.value
            }
        });
    };
    onSubmit = async () => {
        try {
            this.setState({ scoreLoading: true });
            const { submission, selectedQuiz } = this.state;
            let score = 0;
            for (let key in submission) {
                const question = selectedQuiz.questionList.filter(({ id }) => id == key)[0];
                if (question.correctOption === submission[key]) {
                    score++;
                }
            }
            window.scrollTo(0, 0);
            if (this.props.user) {
                await axios.post("/score", { quizId: selectedQuiz.id, score, submission });
            }
            this.setState({ score, isSubmitted: true });
        } catch (e) {
            console.log(e);
        }
        if (this.props.user) {
            this.setState({ scoreLoading: false });
        } else {
            setTimeout(() => {
                this.setState({ scoreLoading: false });
            }, 2000)
        }
    }
    resetCurrentQuizState = () => this.setState({ isSubmitted: false, score: 0, submission: {} })
    resetQuiz = () => {
        Modal.confirm({
            title: 'Do you want to reset this question?',
            icon: <ExclamationCircleOutlined />,
            onOk: () => {
                this.resetCurrentQuizState()
            },
            onCancel() { },
        });
    }
    handleSelectQuiz = async (quizId) => {
        this.resetCurrentQuizState();
        this.setState({
            scoreLoading: true,
            selectedQuiz: this.state.quizList.filter(({ id }) => id === quizId)[0],
        });
        if (this.props.user) {
            try {
                await this.getScore(quizId);
            } catch (e) { }
        }
        this.setState({
            scoreLoading: false
        });
    }
    render() {
        const { quizList, selectedQuiz, isSubmitted, score, scoreLoading } = this.state;
        const questionList = selectedQuiz?.questionList;
        const passingScore = Math.floor(selectedQuiz?.questionList.length * 0.6);
        const showResult = !scoreLoading && isSubmitted;
        return (
            <QuizzzesWrapper>
                {quizList && <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Form.Item label={<strong style={{ paddingRight: '10px' }}>Select Quiz by date</strong>}>
                        <Select value={selectedQuiz?.id} style={{ width: 200 }} onChange={this.handleSelectQuiz}>
                            {
                                quizList.map((quiz) => (
                                    <Select.Option key={quiz.id} value={quiz.id}>{quiz.createdAt}</Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                </div>}
                {questionList && (
                    <div className="question-list">
                        {scoreLoading && <div className="example">
                            <Spin size="large" />
                        </div>}
                        {showResult &&
                            <Spin spinning={this.state.scoreLoading}>
                                <Result
                                    status={score >= passingScore ? 'success' : 'error'}
                                    title={score >= passingScore ? 'Congratulations. you passed' : 'Sorry. You failed'}
                                    subTitle={<Space>
                                        <Button type="primary" onClick={this.resetQuiz}>Attempt Again</Button>
                                        <Button href="#q_1">View Answer</Button>
                                    </Space>}
                                    extra={[
                                        <Space size="large">
                                            <Statistic title="Your Score" value={score} />
                                            <Statistic title="Passing Score" value={passingScore} />
                                        </Space>
                                    ]}
                                >
                                </Result>
                            </Spin>
                        }
                        <Typography.Title level={2}>Quiz</Typography.Title>
                        <Typography.Text>
                            Responders will see the results and correct answers immediately after submitting the Quiz.
                            </Typography.Text><br />
                        <Typography.Text
                            id="q_1"
                            type="secondary"
                            style={{ fontSize: '16px' }}
                        >
                            (Total Question: {questionList.length})
                            </Typography.Text>
                        {
                            questionList.map((question, index) => (
                                <Card
                                    key={question.id}
                                    bordered={false}
                                    style={{ background: '#f5f5f5', margin: '15px 0' }}
                                >
                                    <Typography.Paragraph strong>{index + 1}. {question.text}</Typography.Paragraph>
                                    <Radio.Group
                                        onChange={(e) => this.onChange(e, question.id)}
                                        value={this.state.submission[question.id]}
                                    >
                                        <Space direction="vertical">
                                            {
                                                question.options.map((option) => (
                                                    <Radio
                                                        value={option.id}
                                                        key={option.id}
                                                    >
                                                        {option.text}
                                                    </Radio>
                                                ))
                                            }
                                        </Space>
                                        {showResult && <div style={{ margin: '10px 0' }}>
                                            <Tag
                                                color={this.state.submission[question.id] === question.correctOption ? 'success' : 'error'}
                                            >
                                                Correct Answer is option ({question.correctOption})
                                                </Tag>
                                        </div>}
                                    </Radio.Group>
                                </Card>
                            ))
                        }
                        <div>
                            <Button type="primary" size="large" onClick={this.onSubmit}>Submit & See result</Button>
                        </div>
                        {!this.props.user && <Alert
                            style={{ margin: '20px 0px' }}
                            message={<><Link to="/login">Login </Link>to save your choices and results.</>}
                            // description="Additional description and information about copywriting."
                            type="info"
                            showIcon
                        />}
                    </div>
                )}
            </QuizzzesWrapper>
        );
    }
}


const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(Quizzes);