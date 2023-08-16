import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import AddUser from '../components/Users/AddUser';
import EditUser from '../components/Users/EditUser';
import ViewUser from '../components/Users/ViewUser';
import Loader from '../components/Loader';

const UserList = lazy(() => import('../view/UsersLists'));

const RoutesData = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Suspense fallback={
                    <Loader />
                }
                >
                    <UserList />
                </Suspense>
                } />
                               <Route path="/addnewuser" element={<Suspense fallback={
                    <Loader />
                }
                >
                    <AddUser />
                </Suspense>
                } />
                <Route path="/editUser/:id" element={<Suspense fallback={
                    <Loader />
                }
                >
                    <EditUser />
                </Suspense>
                } />
                <Route path="/viewUser/:id" element={<ViewUser fallback={
                    <Loader />
                }
                >
                    <EditUser />
                </ViewUser>
                } />
            </Routes>
        </>
    )
}

export default RoutesData;