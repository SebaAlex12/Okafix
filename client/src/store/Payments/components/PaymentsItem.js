import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

import {
  payment_invoice_statuses,
  payment_pattern_statuses,
  payment_cycles,
} from "../../ini";
import { updatePayment, removePayment } from "../actions";

import ModalDialog from "../../../common/ModalDialog/components/ModalDialog";
import PaymentsToPdfInvoice from "./PaymentsToPdfInvoice";

import { Button, WarningButton } from "../../../themes/basic";
import {
  faFilePdf,
  faTimes,
  faInfo,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class PaymentsItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPaymentToPdfModalTrigger: false,
    };
  }
  componentDidMount() {
    const {
      item: {
        _id,
        paymentType,
        paymentMonth,
        paymentCycle,
        paymentNumber,
        companyName,
        contractorName,
        companyAddress,
        contractorAddress,
        companyNIP,
        contractorNIP,
        companyWebsite,
        companyPhone,
        contractorPhone,
        companyMail,
        contractorMail,
        companyBankName,
        companyBankAcount,
        description,
        netValue,
        grossValue,
        status,
        paymentMethod,
        createdBy,
        termAt,
        createdAt,
      },
    } = this.props;
    this.setState({
      _id,
      paymentType,
      paymentMonth,
      paymentCycle,
      paymentNumber,
      companyName,
      contractorName,
      companyAddress,
      contractorAddress,
      companyNIP,
      contractorNIP,
      companyWebsite,
      companyPhone,
      contractorPhone,
      companyMail,
      contractorMail,
      companyBankName,
      companyBankAcount,
      description,
      netValue,
      grossValue,
      status,
      paymentMethod,
      createdBy,
      termAt,
      createdAt,
    });
  }
  showPaymentToPdfModal = (result) => {
    this.setState({
      ...this.state,
      showPaymentToPdfModalTrigger: result,
    });
  };
  onChangeSelectHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    const { updatePayment } = this.props;
    const { _id } = this.state;
    const data = {
      _id,
      [event.target.name]: event.target.value,
    };
    updatePayment(data);
  };
  onchangeInputHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  removePaymentHandler = (event) => {
    const { removePayment } = this.props;
    const { _id } = this.state;
    const result = window.confirm("Czy napewno chcesz usunąć płatność ?");
    if (result === true) {
      removePayment(_id);
    }
  };
  onchangeElementSubmitHandler = (element) => {
    const { updatePayment } = this.props;
    const { _id } = this.state;
    const data = {
      _id,
      ...element,
    };
    updatePayment(data);
  };
  render() {
    const { item } = this.props;
    const {
      showPaymentToPdfModalTrigger,
      paymentType,
      paymentMonth,
      paymentCycle,
      paymentNumber,
      contractorName,
      description,
      netValue,
      grossValue,
      status,
      termAt,
      createdAt,
    } = this.state;
    const statuses =
      paymentType === "Faktura"
        ? payment_invoice_statuses
        : payment_pattern_statuses;

    return (
      <React.Fragment>
        <tr>
          <td>
            <Button title={description}>
              <FontAwesomeIcon icon={faInfo} />
            </Button>
            {paymentNumber}
          </td>
          <td>{contractorName}</td>
          <td>{paymentType}</td>
          <td>
            <select
              className="form-control"
              onChange={this.onChangeSelectHandler}
              value={status}
              name="status"
              required
            >
              {statuses
                ? statuses.map((item) => {
                    return (
                      <option
                        key={item._id}
                        value={item.name}
                        selected={item.name === status ? "selected" : null}
                      >
                        {item.name}
                      </option>
                    );
                  })
                : null}
            </select>
          </td>
          <td>
            {paymentType === "Wzór" ? (
              <select
                className="form-control"
                onChange={this.onChangeSelectHandler}
                value={paymentCycle}
                name="paymentCycle"
                required
              >
                {payment_cycles
                  ? payment_cycles.map((item) => {
                      return (
                        <option
                          key={item._id}
                          value={item.name}
                          defaultValue={
                            item.name === paymentCycle ? "selected" : null
                          }
                        >
                          {item.name}
                        </option>
                      );
                    })
                  : null}
              </select>
            ) : (
              "nie dotyczy"
            )}
          </td>
          <td>{paymentMonth}</td>
          <td>{paymentType === "Faktura" ? termAt : "nie dotyczy"}</td>
          <td>{moment(createdAt).format("YYYY-MM-DD HH:mm:ss")}</td>
          <td>
            <input
              className="form-control input-price"
              type="text"
              name="netValue"
              value={netValue}
              onChange={this.onchangeInputHandler}
            />
            <Button
              onClick={() =>
                this.onchangeElementSubmitHandler({ netValue: netValue })
              }
            >
              <FontAwesomeIcon icon={faPencilAlt} />
            </Button>
          </td>
          <td>
            <input
              className="form-control input-price"
              type="text"
              name="grossValue"
              value={grossValue}
              onChange={this.onchangeInputHandler}
            />
            <Button
              onClick={() =>
                this.onchangeElementSubmitHandler({ grossValue: grossValue })
              }
            >
              <FontAwesomeIcon icon={faPencilAlt} />
            </Button>
          </td>
          <td className="details">
            {paymentType === "Faktura" ? (
              <Button onClick={() => this.showPaymentToPdfModal(true)}>
                <FontAwesomeIcon icon={faFilePdf} />
              </Button>
            ) : null}
            {showPaymentToPdfModalTrigger ? (
              <ModalDialog
                title="Wygenerowany pdf"
                showModal={() => this.showPaymentToPdfModal(false)}
                width="960px"
              >
                <PaymentsToPdfInvoice item={item} />
              </ModalDialog>
            ) : null}
            <WarningButton warning onClick={this.removePaymentHandler}>
              <FontAwesomeIcon icon={faTimes} />
            </WarningButton>
          </td>
        </tr>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loggedUser: state.users.logged_user,
  };
};

export default connect(mapStateToProps, { updatePayment, removePayment })(
  PaymentsItem
);
