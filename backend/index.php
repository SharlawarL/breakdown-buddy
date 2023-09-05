<?php

/**
 * **********************************************************************
 * 
 * API          - Core PHP
 * Version      - 7.2
 * Developer    - Lalit Adellu Sharlawar
 * Email        - lalitsharlawar@gmail.com
 * Mobile       - 9657256675
 * 
 * **********************************************************************
 */
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, PUT, OPTIONS, PATCH, DELETE');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Authorization, Content-Type, x-xsrf-token, x_csrftoken, Cache-Control, X-Requested-With');
header('Content-Type: application/json');

$method = isset($_REQUEST['method']) ? $_REQUEST['method'] : '';
$result = [];

$sms_key = '6meJWIzOYGEh0uMRZqoHrKvjnTdD17XslBfQ3c84kg2b5VaA9yNlztM5cPoRjTWQXCfrEL8Jmdn1uOUh';

/**
 * Database configuration
 */
$servername = "localhost";
$username = "u641427100_breakdownbuddy";
$password = "Breakdownbuddy@12345";
$dbname = "u641427100_breakdownbuddy";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
} else {
   // echo "Connection successfull";
}

    
/**
 * User Login
 */
if($method == 'login')
{
    $mobile = trim($_REQUEST['mobile']);
    $password = trim($_REQUEST['password']);
    $usertype = trim($_REQUEST['usertype']);
    
    $sql = "SELECT * FROM user where mobile='".$mobile."' and password='".$password."' and usertype='".$usertype."' ";
    $resultSql = $conn->query($sql);
    
    if ($resultSql->num_rows > 0) {
         while($row = $resultSql->fetch_assoc()) {
            $result['status'] = 200;
            $result['response'] = true;
            $result['message'] = 'login successfull';
            $result['data'] = $row;
         }
    } else {
       $result['status'] = 200;
        $result['response'] = false;
        $result['message'] = 'Username and password incorrect';
        $result['data'] = "";
    }
    
/**
 * Register user
 */
} else if($method == 'register')
{
    $mobile = trim($_REQUEST['mobile']);
    $name = trim($_REQUEST['name']);
    $email = trim($_REQUEST['email']);
    $address = trim($_REQUEST['address']);
    $dob = trim($_REQUEST['dob']);
    $message = trim($_REQUEST['message']);
    $password = trim($_REQUEST['password']);
    $usertype = trim($_REQUEST['usertype']);
    $upi = trim($_REQUEST['upi']);
    
    /**
     * Checking for user
     */
    $sql = "SELECT * FROM user where mobile='".$mobile."'";
    $resultSql = $conn->query($sql);
    
    if ($resultSql->num_rows > 0) {
            $result['status'] = 200;
            $result['response'] = false;
            $result['message'] = 'User already exits';
            $result['data'] = "";
    } else {
        $sql = "INSERT INTO user (name, mobile, password, email, address, dob, usertype, upi)  VALUES ('".$name."', '".$mobile."','".$password."', '".$email."', '".$address."', '".$dob."', '".$usertype."', '".$upi."')";
        
        if ($conn->query($sql) === TRUE) {
                
                $result['status'] = 200;
                $result['response'] = true;
                $result['message'] = 'New User created '.$mobile;
                
        } else {
            $result['status'] = 200;
            $result['response'] = false;
            $result['message'] = "Error: " . $sql . "<br>" . $conn->error;
            $result['data'] = "";
        }
    }
    
/**
 * Update User
 */
} else if($method == 'update')
{
    
    $mobile = trim($_REQUEST['mobile']);
    $name = trim($_REQUEST['name']);
    $email = trim($_REQUEST['email']);
    $address = trim($_REQUEST['address']);
    $dob = trim($_REQUEST['dob']);
    $upi = trim($_REQUEST['upi']);
    
    $sql = "SELECT * FROM user where mobile='".$mobile."'";
    $resultSql = $conn->query($sql);
    
    if ($resultSql->num_rows > 0) {
            $sql = "Update user SET name= '".$name."', email='".$email."', address='".$address."', dob='".$dob."',  upi='".$upi."' WHERE mobile ='".$mobile."'";
        
        if ($conn->query($sql) === TRUE) {
            $result['status'] = 200;
            $result['response'] = true;
            $result['message'] = 'User updated successfully';
            $result['data'] = "";
        } else {
            $result['status'] = 200;
            $result['response'] = false;
            $result['message'] = "Error: " . $sql . "<br>" . $conn->error;
            $result['data'] = "";
        }
            
    } else {
        $result['status'] = 200;
        $result['response'] = false;
        $result['message'] = 'User not exits';
        $result['data'] = "";
    }

/**
 * Get User List
 */
}  else if($method == 'getUserList')
{
    
    $sql = "SELECT * FROM user where name != 'admin' ";
    $resultSql = $conn->query($sql);
    
    $mechList = [];
    
    if ($resultSql->num_rows > 0) {
        while($row = $resultSql->fetch_assoc()) {
            array_push($mechList, $row);
        }
        
        $result['status'] = 200;
        $result['response'] = true;
        $result['message'] = 'User data';
        $result['data'] = $mechList;
            
    } else {
        $result['status'] = 200;
        $result['response'] = false;
        $result['message'] = 'Mechanic not available';
        $result['data'] = "";
    }

/**
 * Get User By Id
 */
} else if($method == 'getUserById')
{
    $id = trim($_REQUEST['id']);
    
    $sql = "SELECT * FROM user where id='".$id."' ";
    $resultSql = $conn->query($sql);
    
    $mechList = [];
    
    if ($resultSql->num_rows > 0) {
        while($row = $resultSql->fetch_assoc()) {
            array_push($mechList, $row);
        }
        
        $result['status'] = 200;
        $result['response'] = true;
        $result['message'] = 'User data';
        $result['data'] = $mechList;
            
    } else {
        $result['status'] = 200;
        $result['response'] = false;
        $result['message'] = 'User not available';
        $result['data'] = "";
    }

/**
 * Get Mechanic List
 */
} else if($method == 'getMechanic')
{
    
    $sql = "SELECT * FROM user where usertype='mechanic'";
    $resultSql = $conn->query($sql);
    
    $mechList = [];
    
    if ($resultSql->num_rows > 0) {
        while($row = $resultSql->fetch_assoc()) {
            array_push($mechList, $row);
        }
        
        $result['status'] = 200;
        $result['response'] = true;
        $result['message'] = 'Mechanic data';
        $result['data'] = $mechList;
            
    } else {
        $result['status'] = 200;
        $result['response'] = false;
        $result['message'] = 'Mechanic not available';
        $result['data'] = "";
    }

/**
 * Search Mechanic by name, mobile, address etc
 */
}  else if($method == 'getMechanicSearch')
{
    $search = trim($_REQUEST['search']);
    
    $sql = "SELECT * FROM user where usertype='mechanic' and ( name like '%".$search."%' or mobile like '%".$search."%' or address like '%".$search."%') ";
    $resultSql = $conn->query($sql);
    
    $mechList = [];
    
    if ($resultSql->num_rows > 0) {
        while($row = $resultSql->fetch_assoc()) {
            array_push($mechList, $row);
        }
        
        $result['status'] = 200;
        $result['response'] = true;
        $result['message'] = 'Mechanic data';
        $result['data'] = $mechList;
            
    } else {
        $result['status'] = 200;
        $result['response'] = false;
        $result['message'] = 'Mechanic not available';
        $result['data'] = "";
    }
/**
 * Get Mechanic  By ID
 */
} else if($method == 'getMechanicData')
{
    $mech_id = trim($_REQUEST['mech_id']);
    $type = trim($_REQUEST['type']);
    
    if(isset($type) && !empty($type))
    {
        $sql = "SELECT b.id, b.status, b.created_on,  b.longitude, b.latitude, u.address, u.name, u.mobile FROM booking b INNER JOIN user u ON u.id = b.user_id" ;
    } else {
        $sql = "SELECT b.id, b.status, b.created_on, b.longitude, b.latitude, u.address, u.name, u.mobile FROM booking b INNER JOIN user u ON u.id = b.user_id WHERE b.mech_id='".$mech_id."'";
    }
    $resultSql = $conn->query($sql);
    
    $mechList = [
        "metrics" => [
            "Pending" => 0,
            "Current" => 0,
            "Completed" => 0
            ],
        "data" => []
        ];
    
    if ($resultSql->num_rows > 0) {
        while($row = $resultSql->fetch_assoc()) {
            if($row['status'] == 'Pending')
            {
                $mechList['metrics']['Pending'] += 1;
                
                array_push($mechList['data'], $row);
            }
            if($row['status'] == 'Current')
            {
                $mechList['metrics']['Current'] += 1;
            }
            if($row['status'] == 'Completed')
            {
                $mechList['metrics']['Completed'] += 1;
            }
        }
        
        $result['status'] = 200;
        $result['response'] = true;
        $result['message'] = 'Mechanic data';
        $result['data'] = $mechList;
            
    } else {
        $result['status'] = 200;
        $result['response'] = false;
        $result['message'] = 'Mechanic not available';
        $result['data'] = "";
    }
/**
 * Get Booking List
 */
} else if($method == 'getBooking')
{
    $user_id = trim($_REQUEST['user_id']);
     
    $sql = "SELECT * FROM booking b INNER JOIN user u ON u.id = b.mech_id WHERE b.user_id='".$user_id."' ";
    $resultSql = $conn->query($sql);
    
    $myBookings = [];
    
    if ($resultSql->num_rows > 0) {
        while($row = $resultSql->fetch_assoc()) {
            array_push($myBookings, $row);
        }
            
        $result['status'] = 200;
        $result['response'] = true;
        $result['message'] = 'Booking data';
        $result['data'] = $myBookings;
    } else {
        $result['status'] = 200;
        $result['response'] = false;
        $result['message'] = 'Booking not available';
        $result['data'] = "";
    }
} else if($method == 'getBookingMech')
{
    $mech_id = trim($_REQUEST['mech_id']);
    $status = trim($_REQUEST['status']);
    
    $type =  trim($_REQUEST['type']);
     
    if(isset($type) && !empty($type))
    {
        $sql = "SELECT b.id, b.status, b.created_on, b.completed_on, b.longitude, b.latitude, u.mobile, u.address, u.name, u.mobile FROM booking b INNER JOIN user u ON u.id = b.user_id WHERE b.status='".$status."' ";
    } else {
    $sql = "SELECT b.id, b.status, b.created_on, b.completed_on, b.longitude, b.latitude, u.mobile, u.address, u.name, u.mobile FROM booking b INNER JOIN user u ON u.id = b.user_id WHERE b.mech_id='".$mech_id."' and b.status='".$status."' ";
    }
    
    // print_r($sql);die();
    
    $resultSql = $conn->query($sql);
    
    $myBookings = [];
    
    if ($resultSql->num_rows > 0) {
        while($row = $resultSql->fetch_assoc()) {
            array_push($myBookings, $row);
        }
            
        $result['status'] = 200;
        $result['response'] = true;
        $result['message'] = 'Booking data';
        $result['data'] = $myBookings;
    } else {
        $result['status'] = 200;
        $result['response'] = false;
        $result['message'] = 'Booking not available';
        $result['data'] = "";
    }
}  else if($method == 'saveBooking')
{
    $mech_id = trim($_REQUEST['mech_id']);
    $user_id = trim($_REQUEST['user_id']);
    $created_on  = date("Y-m-d H:i:s");
    
    $latitude = trim($_REQUEST['latitude']);
    $longitude = trim($_REQUEST['longitude']);
    

    $sql = "INSERT INTO booking (mech_id, user_id, created_on, status,latitude, longitude)  VALUES ('".$mech_id."', '".$user_id."','".$created_on."', 'Pending', '".$latitude."', '".$longitude."')";
    
    if ($conn->query($sql) === TRUE) {
            
            $result['status'] = 200;
            $result['response'] = true;
            $result['message'] = 'New booking created '.$mobile;
            
    } else {
        $result['status'] = 200;
        $result['response'] = false;
        $result['message'] = "Error: " . $sql . "<br>" . $conn->error;
        $result['data'] = "";
    }
    
} else if($method == 'updateBooking')
{
    $booking_id = trim($_REQUEST['booking_id']);
    $status = trim($_REQUEST['status']);
    $remark = trim($_REQUEST['remark']);
    $amount = trim($_REQUEST['amount']);
    $completed_on  = date("Y-m-d H:i:s");
    
    
    

    $sql = "UPDATE booking SET status='".$status."',remark='".$remark."', amount='".$amount."', completed_on='".$completed_on."' where id='".$booking_id."' ";
    // print_r($sql);die();
    
    if ($conn->query($sql) === TRUE) {
            
            $result['status'] = 200;
            $result['response'] = true;
            $result['message'] = ' booking Updated';
            
    } else {
        $result['status'] = 200;
        $result['response'] = false;
        $result['message'] = "Error: " . $sql . "<br>" . $conn->error;
        $result['data'] = "";
    }
    
} else {
    $result['status'] = 200;
    $result['response'] = false;
    $result['message'] = 'Samething went wrong';
    $result['data'] = '';
}
print_r(json_encode($result));
die();

/**
 * **********************************************************************
 * 
 *                          End API
 * 
 * **********************************************************************
 */