import React, { Component } from 'react';
import { Table, Header } from 'semantic-ui-react';

export default class SendInfo extends Component {
	render() {
		return (
			<React.Fragment>
				<Table basic="very" className="gray">
					<Table.Body>
						<Table.Row>
							<Table.Cell singleLine width={6} verticalAlign="middle">
								<Header as="h6">
									<Header.Content>ارسال کالا :</Header.Content>
								</Header>
							</Table.Cell>
							<Table.Cell>
								هزینه ارسال کالا به ارومیه 19,999 تومان است. فروشنده حداکثر 24 ساعت پس از پرداخت
							</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell singleLine width={6} verticalAlign="middle">
								<Header as="h6">
									<Header.Content>تحویل کالا :</Header.Content>
								</Header>
							</Table.Cell>
							<Table.Cell>کالا طی 2 تا 4 روز آینده به شما تحویل داده می شود.</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell singleLine width={6} verticalAlign="middle">
								<Header as="h6">
									<Header.Content>نحوه پرداخت :</Header.Content>
								</Header>
							</Table.Cell>
							<Table.Cell>پرداخت توسط کلیه کارت های بانکی متصل به شتاب</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell singleLine width={6} verticalAlign="middle">
								<Header as="h6">
									<Header.Content>روش ارسال:</Header.Content>
								</Header>
							</Table.Cell>
							<Table.Cell>ارسال در کوتاهترین زمان به تمام نقاط ایران با هزینه 19,999 تومان</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table>
			</React.Fragment>
		);
	}
}
