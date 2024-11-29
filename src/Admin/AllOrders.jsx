import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';

const AllOrders = () => {

    const [users, setUsers] = useState([]);
    useEffect(() => {
        getUsers();

    })
    const getUsers = async () => {
        try {
            const res = await axios.get(`http://localhost:4000/user/all-users?role=0`);
            setUsers(res.data.users);
        } catch (error) {
            console.log(error);
        }

    }

    const handleDelete = async (id) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                const res = await axios.delete(`http://localhost:4000/user/delete-user/${id}`);

                if (res.status === 200) {
                    Swal.fire(
                        'Deleted!',
                        'The user has been deleted.',
                        'success'
                    );
                    getUsers(); // Refresh the users list after successful deletion
                } else {
                    Swal.fire(
                        'Error!',
                        'There was an issue deleting the user.',
                        'error'
                    );
                }
            }
        } catch (error) {
            Swal.fire(
                'Error!',
                'There was an issue deleting the user.',
                'error'
            );
            console.log(error);
        }
    };

    return (
        <>
            <h3>All ORders</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Sr.No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map((user, i) => {
                            return (
                                <tr>

                                    <td>{i + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.address}</td>
                                    <td><button className="btn btn-primary" onClick={() => handleDelete(user._id)}>Remove</button></td>
                                </tr>
                            )
                        })

                    }
                </tbody>
            </table>

        </>
    )
}

export default AllOrders
