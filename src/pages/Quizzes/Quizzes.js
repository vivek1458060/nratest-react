import React, { Component } from 'react';
import { Card, Typography, Radio, Space, Button, Result, Statistic, Modal, Spin, Tag, Form, Select, Alert } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import QuizzzesWrapper from './Quizzes.style';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const quizList = [
    {
        "subject": "APTITUDE",
        "id": "60acb6cb598a43f44f8415eb",
        "heading": "Aptitude Quiz",
        "createdAt": "3rd June",
        "questionList": [
            {
                "id": 1,
                "text": "If 3 divides the integer n, the remainder is 2. Then, what will be the remainder when 7n is divided by 3",
                "options": [
                    {
                        "id": 1,
                        "text": "3"
                    },
                    {
                        "id": 2,
                        "text": "2"
                    },
                    {
                        "id": 3,
                        "text": "6"
                    },
                    {
                        "id": 4,
                        "text": "4"
                    }
                ],
                "correctOption": 2
            },
            {
                "id": 2,
                "text": "What is the remainder when 1294*1298 is divided by 16",
                "options": [
                    {
                        "id": 1,
                        "text": "14"
                    },
                    {
                        "id": 2,
                        "text": "11"
                    },
                    {
                        "id": 3,
                        "text": "12"
                    },
                    {
                        "id": 4,
                        "text": "10"
                    }
                ],
                "correctOption": 3
            },
            {
                "id": 3,
                "text": `310 + 510 is divisible by`,
                "options": [
                    {
                        "id": 1,
                        "text": "34"
                    },
                    {
                        "id": 2,
                        "text": "26"
                    },
                    {
                        "id": 3,
                        "text": "8"
                    },
                    {
                        "id": 4,
                        "text": "20"
                    }
                ],
                "correctOption": 4
            },
            {
                "id": 4,
                "text": "What is remainder obtained if 45518 is divided by 19",
                "options": [
                    {
                        "id": 1,
                        "text": "0"
                    },
                    {
                        "id": 2,
                        "text": "3"
                    },
                    {
                        "id": 3,
                        "text": "4"
                    },
                    {
                        "id": 4,
                        "text": "1"
                    }
                ],
                "correctOption": 4
            },
            {
                "id": 5,
                "text": `What is the remainder of 15+25+ 35 + 45 + 55 + 65+75+…..+ 505 when divided by 5`,
                "options": [
                    {
                        "id": 1,
                        "text": "3"
                    },
                    {
                        "id": 2,
                        "text": "4"
                    },
                    {
                        "id": 3,
                        "text": "2"
                    },
                    {
                        "id": 4,
                        "text": "0"
                    }
                ],
                "correctOption": 4
            },
            {
                "id": 6,
                "text": "What is the unit digit of 287*586*878",
                "options": [
                    {
                        "id": 1,
                        "text": "6"
                    },
                    {
                        "id": 2,
                        "text": "9"
                    },
                    {
                        "id": 3,
                        "text": "2"
                    },
                    {
                        "id": 4,
                        "text": "4"
                    }
                ],
                "correctOption": 1
            },
            {
                "id": 7,
                "text": "Find the remainder when 1! + 2! + 3! +4! + 5! + ————–  1000! is divided by 8",
                "options": [
                    {
                        "id": 1,
                        "text": "1"
                    },
                    {
                        "id": 2,
                        "text": "2"
                    },
                    {
                        "id": 3,
                        "text": "4"
                    },
                    {
                        "id": 4,
                        "text": "3"
                    }
                ],
                "correctOption": 1
            },
            {
                "id": 8,
                "text": `Find the remainder when 51203 is divided by 7`,
                "options": [
                    {
                        "id": 1,
                        "text": "2"
                    },
                    {
                        "id": 2,
                        "text": "4"
                    },
                    {
                        "id": 3,
                        "text": "5"
                    },
                    {
                        "id": 4,
                        "text": "6"
                    }
                ],
                "correctOption": 2
            },
            {
                "id": 9,
                "text": `When (67<sup>67</sup> + 67) is divided by 68, the remainder is?`,
                "options": [
                    {
                        "id": 1,
                        "text": "1"
                    },
                    {
                        "id": 2,
                        "text": "63"
                    },
                    {
                        "id": 3,
                        "text": "66"
                    },
                    {
                        "id": 4,
                        "text": "67"
                    }
                ],
                "correctOption": 3
            },
            {
                "id": 10,
                "text": `What is the remainder when [(9)<sup>19</sup> + 6] is divided by 8`,
                "options": [
                    {
                        "id": 1,
                        "text": "6"
                    },
                    {
                        "id": 2,
                        "text": "7"
                    },
                    {
                        "id": 3,
                        "text": "0"
                    },
                    {
                        "id": 4,
                        "text": "3"
                    }
                ],
                "correctOption": 2
            }
        ]
    },
    {
        "subject": "APTITUDE",
        "id": "609e5c9e3dee7c066a1bddc4",
        "heading": "Aptitude Quiz",
        "createdAt": "2nd June",
        "questionList": [
            {
                "id": 1,
                "text": "What is unit digit of the expression (1!)<sup>1</sup> + (2!)<sup>2</sup> + (3!)<sup>3</sup> + ............+ (10!)<sup>10</sup>",
                "options": [
                    {
                        "id": 1,
                        "text": "4"
                    },
                    {
                        "id": 2,
                        "text": "5"
                    },
                    {
                        "id": 3,
                        "text": "6"
                    },
                    {
                        "id": 4,
                        "text": "7"
                    }
                ],
                "correctOption": 4
            },
            {
                "id": 2,
                "text": "What is the unit digit of the expression (888)<sup>9325!</sup>",
                "options": [
                    {
                        "id": 1,
                        "text": "4"
                    },
                    {
                        "id": 2,
                        "text": "6"
                    },
                    {
                        "id": 3,
                        "text": "8"
                    },
                    {
                        "id": 4,
                        "text": "9"
                    }
                ],
                "correctOption": 2
            },
            {
                "id": 3,
                "text": `Find the unit digit of the expression 1<sup>2</sup> + 2<sup>2</sup> + 3<sup>2</sup> + 4<sup>2</sup> + 5<sup>2</sup> + ................+ 100<sup>2</sup>`,
                "options": [
                    {
                        "id": 1,
                        "text": "1"
                    },
                    {
                        "id": 2,
                        "text": "0"
                    },
                    {
                        "id": 3,
                        "text": "2"
                    },
                    {
                        "id": 4,
                        "text": "3"
                    }
                ],
                "correctOption": 2
            },
            {
                "id": 4,
                "text": "Find the highest power of 81 that can divide 1800!",
                "options": [
                    {
                        "id": 1,
                        "text": "220"
                    },
                    {
                        "id": 2,
                        "text": "225"
                    },
                    {
                        "id": 3,
                        "text": "224"
                    },
                    {
                        "id": 4,
                        "text": "230"
                    }
                ],
                "correctOption": 3
            },
            {
                "id": 5,
                "text": `Find the number of zeros at the end of the product of the expression: 
                    2<sup>1</sup> x 5<sup>2</sup> x 2<sup>3</sup> x 2<sup>5</sup> x 5<sup>4</sup> x 5<sup>7</sup> x 2<sup>9</sup> x 5<sup>10</sup>
                `,
                "options": [
                    {
                        "id": 1,
                        "text": "17"
                    },
                    {
                        "id": 2,
                        "text": "19"
                    },
                    {
                        "id": 3,
                        "text": "18"
                    },
                    {
                        "id": 4,
                        "text": "20"
                    }
                ],
                "correctOption": 3
            },
            {
                "id": 6,
                "text": "Find the number of zeros in the expression 253!",
                "options": [
                    {
                        "id": 1,
                        "text": "61"
                    },
                    {
                        "id": 2,
                        "text": "61"
                    },
                    {
                        "id": 3,
                        "text": "63"
                    },
                    {
                        "id": 4,
                        "text": "62"
                    }
                ],
                "correctOption": 4
            },
            {
                "id": 7,
                "text": "Find the highest power of 63 which can exactly divide 6336!",
                "options": [
                    {
                        "id": 1,
                        "text": "955"
                    },
                    {
                        "id": 2,
                        "text": "1054"
                    },
                    {
                        "id": 3,
                        "text": "854"
                    },
                    {
                        "id": 4,
                        "text": "1150"
                    }
                ],
                "correctOption": 2
            },
            {
                "id": 8,
                "text": `If the seven digit number 74 x 29y6 is divisible by 72, then what will be the value of (2x+3y) ?`,
                "options": [
                    {
                        "id": 1,
                        "text": "21"
                    },
                    {
                        "id": 2,
                        "text": "20"
                    },
                    {
                        "id": 3,
                        "text": "19"
                    },
                    {
                        "id": 4,
                        "text": "16"
                    }
                ],
                "correctOption": 3
            },
            {
                "id": 9,
                "text": `A three-digit number 4a3 is added to another three-digit number 984 to give the four digit number 13b7 which is divisible by 11. Then the value of (a + b) is:`,
                "options": [
                    {
                        "id": 1,
                        "text": "11"
                    },
                    {
                        "id": 2,
                        "text": "12"
                    },
                    {
                        "id": 3,
                        "text": "9"
                    },
                    {
                        "id": 4,
                        "text": "10"
                    }
                ],
                "correctOption": 4
            },
            {
                "id": 10,
                "text": `If the six digit number 15x1y2 is divisible by 44, then (x + y) is equal to:`,
                "options": [
                    {
                        "id": 1,
                        "text": "7"
                    },
                    {
                        "id": 2,
                        "text": "8"
                    },
                    {
                        "id": 3,
                        "text": "6"
                    },
                    {
                        "id": 4,
                        "text": "9"
                    }
                ],
                "correctOption": 1
            }
        ]
    },
    {
        "subject": "APTITUDE",
        "id": "60b61cd2027b8807a290a777",
        "heading": "Aptitude Quiz",
        "createdAt": "1st June",
        "questionList": [
            {
                "id": 1,
                "text": "Find the numbers of all factors of 1008.",
                "options": [
                    {
                        "id": 1,
                        "text": "25"
                    },
                    {
                        "id": 2,
                        "text": "28"
                    },
                    {
                        "id": 3,
                        "text": "40"
                    },
                    {
                        "id": 4,
                        "text": "30"
                    }
                ],
                "correctOption": 4
            },
            {
                "id": 2,
                "text": "Find the number of prime factor of 111.",
                "options": [
                    {
                        "id": 1,
                        "text": "2"
                    },
                    {
                        "id": 2,
                        "text": "4"
                    },
                    {
                        "id": 3,
                        "text": "5"
                    },
                    {
                        "id": 4,
                        "text": "3"
                    }
                ],
                "correctOption": 1
            },
            {
                "id": 3,
                "text": `Find the number of even factor of 512.`,
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
                        "text": "11"
                    }
                ],
                "correctOption": 2
            },
            {
                "id": 4,
                "text": "Find the sum of factor of 360.",
                "options": [
                    {
                        "id": 1,
                        "text": "1130"
                    },
                    {
                        "id": 2,
                        "text": "1170"
                    },
                    {
                        "id": 3,
                        "text": "1370"
                    },
                    {
                        "id": 4,
                        "text": "1270"
                    }
                ],
                "correctOption": 2
            },
            {
                "id": 5,
                "text": "Find the number of all factors of 18522.",
                "options": [
                    {
                        "id": 1,
                        "text": "30"
                    },
                    {
                        "id": 2,
                        "text": "34"
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
                "correctOption": 3
            },
            {
                "id": 6,
                "text": "Which of the following is a prime number.",
                "options": [
                    {
                        "id": 1,
                        "text": "407"
                    },
                    {
                        "id": 2,
                        "text": "409"
                    },
                    {
                        "id": 3,
                        "text": "413"
                    },
                    {
                        "id": 4,
                        "text": "417"
                    }
                ],
                "correctOption": 2
            },
            {
                "id": 7,
                "text": "Which of the following is a prime number.",
                "options": [
                    {
                        "id": 1,
                        "text": "427"
                    },
                    {
                        "id": 2,
                        "text": "421"
                    },
                    {
                        "id": 3,
                        "text": "493"
                    },
                    {
                        "id": 4,
                        "text": "497"
                    }
                ],
                "correctOption": 2
            },
            {
                "id": 8,
                "text": `Which of the following statement is true - 
                    (1) All prime numbers (except 2 & 3) can be written in the form of (6n-1) or (6n+1).
                    (2) All numbers Written in the form of (6n-1) or (6n+1) are prime numbers
                `,
                "options": [
                    {
                        "id": 1,
                        "text": "only a"
                    },
                    {
                        "id": 2,
                        "text": "only b"
                    },
                    {
                        "id": 3,
                        "text": "both a & b"
                    },
                    {
                        "id": 4,
                        "text": "neither a & b"
                    }
                ],
                "correctOption": 1
            },
            {
                "id": 9,
                "text": `Which statements is/are true - 
                    (1) Prime numbers have only two factors.
                    (2) Composite numbers have more than two factors
                    (3) 1 is neither a prime number nor a composite number.
                `,
                "options": [
                    {
                        "id": 1,
                        "text": "Only A"
                    },
                    {
                        "id": 2,
                        "text": "Only B"
                    },
                    {
                        "id": 3,
                        "text": "Only B & C"
                    },
                    {
                        "id": 4,
                        "text": "All are correct"
                    }
                ],
                "correctOption": 4
            },
            {
                "id": 10,
                "text": `Which of the following statements is/are correct - 
                    (1) Recurring decimals are irrational number.
                    (2) Decimals which are non finite and non recurring are irrational numbers.
                    (3) Recurring decimals are rational numbers.
                `,
                "options": [
                    {
                        "id": 1,
                        "text": "Only 1"
                    },
                    {
                        "id": 2,
                        "text": "Only 1 & 2"
                    },
                    {
                        "id": 3,
                        "text": "Only 1 & 3"
                    },
                    {
                        "id": 4,
                        "text": "Only 2 & 3"
                    }
                ],
                "correctOption": 4
            }
        ]
    },
    {
        "subject": "APTITUDE",
        "id": "60b1acdb598a43f44f5c0aca",
        "heading": "Aptitude Quiz",
        "createdAt": "May 31",
        "questionList": [
            {
                "id": 1,
                "text": "How many numbers are divisible by 3 in the numbers 300, 301, 302,..., 499, 500?",
                "options": [
                    {
                        "id": 1,
                        "text": "200"
                    },
                    {
                        "id": 2,
                        "text": "67"
                    },
                    {
                        "id": 3,
                        "text": "66"
                    },
                    {
                        "id": 4,
                        "text": " none of these"
                    }
                ],
                "correctOption": 2
            },
            {
                "id": 2,
                "text": "In the above question total numbers in the set of numbers S = (200,201... 800) which are either divisible by 5 or by 7 is:",
                "options": [
                    {
                        "id": 1,
                        "text": "210"
                    },
                    {
                        "id": 2,
                        "text": "199"
                    },
                    {
                        "id": 3,
                        "text": "190"
                    },
                    {
                        "id": 4,
                        "text": "can't be determined"
                    }
                ],
                "correctOption": 3
            },
            {
                "id": 3,
                "text": `Total number of numbers lying in the range of 1331 and 3113 which are neither divisible by 2, 3 or 5 is :`,
                "options": [
                    {
                        "id": 1,
                        "text": "477"
                    },
                    {
                        "id": 2,
                        "text": "653"
                    },
                    {
                        "id": 3,
                        "text": "594"
                    },
                    {
                        "id": 4,
                        "text": "none of these"
                    }
                ],
                "correctOption": 1
            },
            {
                "id": 4,
                "text": "How many numbers are there in the set S = (200, 201, 202... 800) which are divisible by neither of 5 or 7?",
                "options": [
                    {
                        "id": 1,
                        "text": "411"
                    },
                    {
                        "id": 2,
                        "text": "410"
                    },
                    {
                        "id": 3,
                        "text": "412"
                    },
                    {
                        "id": 4,
                        "text": "none of these"
                    }
                ],
                "correctOption": 1
            },
            {
                "id": 5,
                "text": "Atleast what number must be subtracted from 434079 so that it becomes divisible by 137",
                "options": [
                    {
                        "id": 1,
                        "text": "173"
                    },
                    {
                        "id": 2,
                        "text": "97"
                    },
                    {
                        "id": 3,
                        "text": "63"
                    },
                    {
                        "id": 4,
                        "text": "can't be determined"
                    }
                ],
                "correctOption": 3
            },
            {
                "id": 6,
                "text": ". In the above question, at least what number be added to 434079, so that it will become divisible by (or multiple of) 137?",
                "options": [
                    {
                        "id": 1,
                        "text": "97"
                    },
                    {
                        "id": 2,
                        "text": "75"
                    },
                    {
                        "id": 3,
                        "text": "74"
                    },
                    {
                        "id": 4,
                        "text": "none of these"
                    }
                ],
                "correctOption": 3
            },
            {
                "id": 7,
                "text": "Which one number is closest to 193 which is divisible 18 is :",
                "options": [
                    {
                        "id": 1,
                        "text": "180"
                    },
                    {
                        "id": 2,
                        "text": "198"
                    },
                    {
                        "id": 3,
                        "text": "195"
                    },
                    {
                        "id": 4,
                        "text": "108"
                    }
                ],
                "correctOption": 2
            },
            {
                "id": 8,
                "text": "The product of two numbers ab7 and cd5 could be. where ab7 and cd5 are individually three digit numbers:",
                "options": [
                    {
                        "id": 1,
                        "text": "8135"
                    },
                    {
                        "id": 2,
                        "text": "8735255"
                    },
                    {
                        "id": 3,
                        "text": "79236"
                    },
                    {
                        "id": 4,
                        "text": "none of these"
                    }
                ],
                "correctOption": 4
            },
            {
                "id": 9,
                "text": "When a 3 digit number 984 is added to another 3 digit number 4p3, we get a four digit number 13q7, which is divisible by 11. The value of p + q is:",
                "options": [
                    {
                        "id": 1,
                        "text": "10"
                    },
                    {
                        "id": 2,
                        "text": "12"
                    },
                    {
                        "id": 3,
                        "text": "11"
                    },
                    {
                        "id": 4,
                        "text": "13"
                    }
                ],
                "correctOption": 1
            },
            {
                "id": 10,
                "text": "When a number divided by 9235, we get the quotient 888 and the remainder 222, such a least possible number is:",
                "options": [
                    {
                        "id": 1,
                        "text": "820090"
                    },
                    {
                        "id": 2,
                        "text": "8200920"
                    },
                    {
                        "id": 3,
                        "text": "8200680"
                    },
                    {
                        "id": 4,
                        "text": "none of these"
                    }
                ],
                "correctOption": 4
            }
        ]
    },
    {
        "subject": "APTITUDE",
        "id": "60acfcaa598a43f44f8fcc8f",
        "heading": "Aptitude Quiz",
        "createdAt": "May 30",
        "questionList": [
            {
                "id": 1,
                "text": "What is the largest possible two digit number by which 2179782 can be divided?",
                "options": [
                    {
                        "id": 1,
                        "text": "88"
                    },
                    {
                        "id": 2,
                        "text": "66"
                    },
                    {
                        "id": 3,
                        "text": "50"
                    },
                    {
                        "id": 4,
                        "text": "99"
                    }
                ],
                "correctOption": 4
            },
            {
                "id": 2,
                "text": "At least which number must be subtracted from 9999999 so that it will become the multiple of 125?",
                "options": [
                    {
                        "id": 1,
                        "text": "124"
                    },
                    {
                        "id": 2,
                        "text": "24"
                    },
                    {
                        "id": 3,
                        "text": "4"
                    },
                    {
                        "id": 4,
                        "text": "none of these"
                    }
                ],
                "correctOption": 1
            },
            {
                "id": 3,
                "text": `A number of the form 10" - 1 is always divisible by 11 for every n is a natural number, when`,
                "options": [
                    {
                        "id": 1,
                        "text": "n is odd"
                    },
                    {
                        "id": 2,
                        "text": "n is even"
                    },
                    {
                        "id": 3,
                        "text": "n is prime"
                    },
                    {
                        "id": 4,
                        "text": "can't say"
                    }
                ],
                "correctOption": 2
            },
            {
                "id": 4,
                "text": "Out of the following numbers which is divisible by 132?",
                "options": [
                    {
                        "id": 1,
                        "text": "31218"
                    },
                    {
                        "id": 2,
                        "text": "38148"
                    },
                    {
                        "id": 3,
                        "text": "78520"
                    },
                    {
                        "id": 4,
                        "text": "52020"
                    }
                ],
                "correctOption": 2
            },
            {
                "id": 5,
                "text": "If 653xy is divisible by 80 then the value of x + y is:",
                "options": [
                    {
                        "id": 1,
                        "text": "2"
                    },
                    {
                        "id": 2,
                        "text": "3"
                    },
                    {
                        "id": 3,
                        "text": "4"
                    },
                    {
                        "id": 4,
                        "text": "6"
                    }
                ],
                "correctOption": 4
            },
            {
                "id": 6,
                "text": "The value of k if k35624 is divisible by 11",
                "options": [
                    {
                        "id": 1,
                        "text": "2"
                    },
                    {
                        "id": 2,
                        "text": "7"
                    },
                    {
                        "id": 3,
                        "text": "5"
                    },
                    {
                        "id": 4,
                        "text": "6"
                    }
                ],
                "correctOption": 4
            },
            {
                "id": 7,
                "text": "If 42573k is divisible by 72 then the value of k is ",
                "options": [
                    {
                        "id": 1,
                        "text": "4"
                    },
                    {
                        "id": 2,
                        "text": "6"
                    },
                    {
                        "id": 3,
                        "text": "5"
                    },
                    {
                        "id": 4,
                        "text": "7"
                    }
                ],
                "correctOption": 2
            },
            {
                "id": 8,
                "text": "How many numbers between 1 and 1000 are divisible by 7",
                "options": [
                    {
                        "id": 1,
                        "text": "777"
                    },
                    {
                        "id": 2,
                        "text": "143"
                    },
                    {
                        "id": 3,
                        "text": "142"
                    },
                    {
                        "id": 4,
                        "text": "none of these"
                    }
                ],
                "correctOption": 3
            },
            {
                "id": 9,
                "text": "How many numbers between 55 and 555 including both the extreme values are divisible by 5?",
                "options": [
                    {
                        "id": 1,
                        "text": "100"
                    },
                    {
                        "id": 2,
                        "text": "101"
                    },
                    {
                        "id": 3,
                        "text": "111"
                    },
                    {
                        "id": 4,
                        "text": "none of these"
                    }
                ],
                "correctOption": 2
            },
            {
                "id": 10,
                "text": "How many numbers are there from 100 to 200 ?",
                "options": [
                    {
                        "id": 1,
                        "text": "100"
                    },
                    {
                        "id": 2,
                        "text": "99"
                    },
                    {
                        "id": 3,
                        "text": "101"
                    },
                    {
                        "id": 4,
                        "text": "none of these"
                    }
                ],
                "correctOption": 3
            }
        ]
    },
    {
        "subject": "APTITUDE",
        "id": "60a29d21f8e26b1a947a4889",
        "heading": "Aptitude Quiz",
        "createdAt": "May 29",
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
        "subject": "APTITUDE",
        "id": "609e1cfb598a43f44ff8ae32",
        "heading": "Aptitude Quiz",
        "createdAt": "May 27",
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
        "subject": "APTITUDE",
        "id": "60aeb5c182af3808df4a9a50",
        "heading": "Aptitude Quiz",
        "createdAt": "May 26",
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
        "subject": "APTITUDE",
        "id": "60aeb5edf77ca90903e0476e",
        "heading": "Aptitude Quiz",
        "createdAt": "May 25",
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
        "subject": "APTITUDE",
        "id": "60aeb5d4633b3f08ee3d25c1",
        "heading": "Aptitude Quiz",
        "createdAt": "May 24",
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
            const res = await axios.get(`/test-submission/${quizId}`);
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
                await axios.post("/test-submission", { testId: selectedQuiz.id, score, submission });
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
    handleSelectQuiz = async (value, type) => {
        this.resetCurrentQuizState();
        const selectedQuiz = this.state.quizList.filter((quiz) => {
            return type === 'date' ? quiz.createdAt === value : quiz.subject === value;
        })[0];
        this.setState({
            scoreLoading: true,
            selectedQuiz,
        });
        if (this.props.user) {
            try {
                await this.getScore(selectedQuiz.id);
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
                {quizList && (
                    <Form 
                        layout="vertical" 
                        style={{ display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap', marginBottom: '15px' }}
                    >
                        {/* <Form.Item label={<strong>Subject</strong>} style={{ margin: '0px 10px' }}>
                            <Select 
                                value={selectedQuiz?.subject} 
                                style={{ width: 150 }} 
                                onChange={(value) => this.handleSelectQuiz(value, "subject")}
                            >
                                {
                                    quizList.reduce((acc, quiz) => {
                                        if(!acc.includes(quiz.subject)) {
                                            acc.push(quiz.subject)
                                        }
                                        return acc;
                                    }, []).map((subject) => (
                                        <Select.Option key={subject} value={subject}>{subject}</Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item> */}
                        <Form.Item 
                            label={<strong>Date</strong>} 
                            style={{ margin: '0px 10px' }}
                        >
                            <Select 
                                value={selectedQuiz?.createdAt} 
                                style={{ width: 175 }} 
                                onChange={(value) => this.handleSelectQuiz(value, "date")}
                            >
                                {
                                    quizList.map((quiz) => (
                                        <Select.Option key={quiz.id} value={quiz.createdAt}>{quiz.createdAt}</Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </Form>
                )}
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
                        <Typography.Title level={2}>{selectedQuiz?.heading}</Typography.Title>
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
                                    <Typography.Paragraph strong>{index + 1}. <span dangerouslySetInnerHTML={{ __html: question.text }}></span></Typography.Paragraph>
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
                                                        <span dangerouslySetInnerHTML={{__html: option.text}}></span>
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