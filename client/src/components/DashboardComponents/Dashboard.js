import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import DashboardNav from './DashboardNav';
import DashboardSideNav from './DashboardSideNav';
import Rooms from './Rooms';
import { socketAction, setRoomsAction } from '../../store/actions/RoomsActions';
import '../../css/dashboard.css';
import '../../css/toggle.css';
import io from 'socket.io-client'


  
class Dashboard extends Component {	
	componentDidMount(){
		//console.log(this.props.rooms);
		if(!this.props.socket){
			const socket = io('http://192.168.2.134:8000/')
			socket.on('connect', () => {
				this.props.createSocket(socket)
				//console.log('connected');
				socket.on('rooms', rooms => {
					//console.log(rooms);
					this.props.setRooms(rooms)
	
					// 1 change connected sympol
					// 2 if current people number is greater than max people number 
					// you need to show a notification or an alarm
				})
				socket.on('setConnected', data => {
					//console.log(rooms);
					//console.log(this.props);
					const room = this.props.rooms.allRooms.find(room => room.id == data.roomid)
					if(room){
						if (room.connected !== data.connected) {
							const newRooms = this.props.rooms.allRooms.map(changedRoom => {
								if(changedRoom.id === room.id){
									changedRoom.connected = data.connected
									return changedRoom
								}
								return changedRoom
							})
							this.props.setRooms(newRooms)
						}
					}
				})
			});
			
		}
	}
	render(){
		if(!this.props.user.isAuthenticated) return <Redirect to='/login' />
		return (
			<div>
				<DashboardNav />
				<div className="dashboard-content container-fluid">	
					<div className="row">
						<DashboardSideNav />
						<div className="dashboard-main-content col col-md-9 col-xl-10 pb-5">
							<h5 className="dashboard-main-content-title p-3 mb-5">Dashboard</h5>
							<Rooms />
						</div>
					</div>
				</div>
				
			</div>
		)
	}
}
const mapStateToProps = (state) =>{
	return{
		logoutStatus: state.userData.logoutStatus,
		user: state.userData.user,
		socket: state.socket,
		rooms: state.roomsData.rooms
	}
}
const mapDispatchToProps = (dispatch) =>{
    return {
		createSocket: (socket) => {dispatch(socketAction(socket))},
		setRooms: (rooms) => {dispatch(setRoomsAction(rooms))} 
    }
}
  
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);