// src/pages/CustomerManagement/CustomerManagement.js
import React, { useState, useEffect } from 'react';
import Customer from './Customer';
import CustomerAdd from './CustomerAdd';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function CustomerManagement({searchKeyword}) {
    const [customer, setCustomer] = useState([]);
    const [completed, setCompleted] = useState(0);

    const stateRefresh = () => {
        setCustomer([]);
        setCompleted(0);
        callApi()
            .then((res) => {
                setCustomer(res);
            })
            .catch((err) => console.error(err));
    };

    const callApi = async () => {
        const response = await fetch('/api/minwon-management/customer');
        const body = await response.json();
        return body;
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCompleted((prevCompleted) => (prevCompleted >= 100 ? 0 : prevCompleted + 1));
        }, 20);
        callApi()
            .then((res) => {
                setCustomer(res);
                clearInterval(timer);
            })
            .catch((err) => {
                console.error(err);
                clearInterval(timer);
            });
        return () => {
            clearInterval(timer);
        };
    }, []);

    const filteredComponents = () => {
        if (!Array.isArray(customer)) {
            return null;
        }
        const filtered = customer.filter((c) => {
            return c.name.indexOf(searchKeyword) > -1;
        });
        return filtered.map((c) => (
            <Customer
                key={c.id}
                id={c.id}
                image={c.image}
                name={c.name}
                birthday={c.birthday}
                gender={c.gender}
                job={c.job}
                stateRefresh={stateRefresh}
            />
        ));
    };

    const cellLis = ["번호", "프로필 이미지", "이름", "생년월일", "성별", "직업", "설정"];

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 2,
                    marginBottom: 2
                }}
            >
                <CustomerAdd stateRefresh={stateRefresh} />
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 1080 }}>
                    <TableHead>
                        <TableRow>
                            {cellLis.map((c, index) => (
                                <TableCell key={index} sx={{ fontSize: "1.0rem" }}>
                                    {c}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customer && customer.length > 0 ?
                            filteredComponents() :
                            (
                                <TableRow>
                                    <TableCell colSpan={cellLis.length} align="center">
                                        <CircularProgress
                                            variant="determinate"
                                            value={completed}
                                            sx={{ m: 2 }}
                                        />
                                    </TableCell>
                                </TableRow>
                            )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default CustomerManagement;