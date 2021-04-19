import React, { Component } from "react";
import { Header, Segment, Grid, Table } from "semantic-ui-react";
import NumberFormat from "react-number-format";
export default class ItemPanes extends Component {
  render() {
    const { description, data } = this.props;
    let price = data.price && parseFloat(data.price.replace(/,/g, ""));

    return (
      <React.Fragment>
        <Grid>
          <Grid.Row columns={2} >
            <Grid.Column mobile={16} tablet={10} computer={10}>
              <Header block attached="top" className="orangeBorder textRight">
                توضیحات بیشتر
              </Header>

              <Segment attached className="fadeIn animated fast textRight">
                {description}
              </Segment>
            </Grid.Column>
            {data.post_type === "درخواست کارگر" ? (
              <React.Fragment>
			  <Grid.Column mobile={16} tablet={6} computer={6}>
				<Header
				  block
				  attached="top"
				  className="orangeBorder textRight"
				>
				  مشخصات کلی
				</Header>

				<Segment attached className="fadeIn animated fast textRight">
				  <Table>
					<Table.Body>
					  <Table.Row>
						<Table.Cell>
						  <Header as="h4" image>
							<Header.Content>
							  دستمزد
							  <Header.Subheader>
								دستمزد روزانه
							  </Header.Subheader>
							</Header.Content>
						  </Header>
						</Table.Cell>
						<Table.Cell>
						  {data.base_price == "" ? "دستمزدی تعریف نشده" : data.base_price}
						</Table.Cell>
					  </Table.Row>
					  <Table.Row>
						<Table.Cell>
						  <Header as="h4" image>
							<Header.Content>
							  تعداد
							  <Header.Subheader>
								تعداد کارگر مورد نیاز 
							  </Header.Subheader>
							</Header.Content>
						  </Header>
						</Table.Cell>
						<Table.Cell>
						  {data.quantity == ""
							? "تعدادی اعلام نشده"
							: data.quantity}
						</Table.Cell>
					  </Table.Row>
					  <Table.Row>
						<Table.Cell>
						  <Header as="h4" image>
							<Header.Content>
							  روز کاری
							  <Header.Subheader>
							تعداد روز کاری 
							  </Header.Subheader>
							</Header.Content>
						  </Header>
						</Table.Cell>
						<Table.Cell>
						  {data.work_day == "" || data.work_day == null
							? "تعداد روز مشخص نشده"
							: data.work_day}
						</Table.Cell>
					  </Table.Row>
					  <Table.Row>
						<Table.Cell>
						  <Header as="h4" image>
							<Header.Content>
							  زمان
							  <Header.Subheader>
								تاریخ شروع کار
							  </Header.Subheader>
							</Header.Content>
						  </Header>
						</Table.Cell>
						<Table.Cell>
						{data.expiry.split(' ')[0]}
						</Table.Cell>
					  </Table.Row>
					</Table.Body>
				  </Table>
				</Segment>
			  </Grid.Column>
			</React.Fragment>
            ) : (
              <React.Fragment>
                <Grid.Column mobile={16} tablet={6} computer={6}>
                  <Header
                    block
                    attached="top"
                    className="orangeBorder textRight"
                  >
                    مشخصات کلی
                  </Header>

                  <Segment attached className="fadeIn animated fast textRight">
                    <Table>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>
                            <Header as="h4" image>
                              <Header.Content>
                                واحد
                                <Header.Subheader>
                                  معیار اندازه گیری
                                </Header.Subheader>
                              </Header.Content>
                            </Header>
                          </Table.Cell>
                          <Table.Cell>
                            {data.unit == "" ? "واحدی تعریف نشده" : data.unit}
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            <Header as="h4" image>
                              <Header.Content>
                                قیمت هر واحد
                                <Header.Subheader>
                                  بر حسب {data.unit == "" ? "واحد" : data.unit}
                                </Header.Subheader>
                              </Header.Content>
                            </Header>
                          </Table.Cell>
                          <Table.Cell>
                            {data.unit_price == ""
                              ? "قیمتی برای واحد تعیین نشده"
                              : data.unit_price}
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            <Header as="h4" image>
                              <Header.Content>
                                تعداد
                                <Header.Subheader>
                                  بر حسب {data.unit == "" ? "واحد" : data.unit}
                                </Header.Subheader>
                              </Header.Content>
                            </Header>
                          </Table.Cell>
                          <Table.Cell>
                            {data.unit_quantity == ""
                              ? "تعدادی مشخص نشده"
                              : data.unit_quantity}
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            <Header as="h4" image>
                              <Header.Content>
                                قیمت
                                <Header.Subheader>
                                  بدون حساب تخفیف
                                </Header.Subheader>
                              </Header.Content>
                            </Header>
                          </Table.Cell>
                          <Table.Cell>
                            <NumberFormat
                              value={price + price * (data.discount / 100)}
                              displayType={"text"}
                              thousandSeparator={true}
                            />
                            تومان
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  </Segment>
                </Grid.Column>
              </React.Fragment>
            )}
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  }
}
