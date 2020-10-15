import React, {Component} from 'react';
import Rooms from './Rooms';

  
class Dashboard extends Component {
	render(){
		return (
			<div className="content-wrapper">
				<div className="content-header">
					<div className="container-fluid">
						<div className="row mb-2">
							<div className="col-sm-6">
								<h1 className="m-0 text-dark">Dashboard</h1>
							</div>
						</div>
					</div>
				</div>

				<section className="content">
					<Rooms />
				</section>
			</div>
		)
	}
}
  
export default Dashboard;