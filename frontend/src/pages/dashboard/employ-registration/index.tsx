import { ProFormRadio } from "@ant-design/pro-form";
import { IfCondition } from "components/condition";
import {
  FieldRegistrationTabtButton,
  FininciarTab,
  registerCustomerEnumTab,
} from "config";
import { useState } from "react";
import CustomerCompany from "./customer";
import Workers from "./employes";
import { Form } from "antd";

const EmployeRegistration = () => {
  const [tab, setTab] = useState<any>(registerCustomerEnumTab.Worker);
  const DocumentButtons: FieldRegistrationTabtButton[] = [
    {
      value: registerCustomerEnumTab.Worker,
      label: "Ажилчдын жагсаалт",
    },
    {
      value: registerCustomerEnumTab.CustomerCompany,
      label: "Харилцагч компани жагсаалт",
    },
  ];

  return (
    <>
      <div className="mt-5">
        <ProFormRadio.Group
          name={"documentLine"}
          radioType="button"
          fieldProps={{
            size: "large",
            value: tab,
            onChange: (e) => {
              setTab(e.target.value);
            },
          }}
          options={DocumentButtons?.map((el) => ({
            ...el,
            onChange: (e) => {
              setTab(e);
            },
          }))}
          initialValue={FininciarTab.CustomerCompany}
        />
      </div>
      <Form>
        <IfCondition
          condition={tab === registerCustomerEnumTab.Worker}
          whenTrue={<Workers />}
        />

        <IfCondition
          condition={tab === registerCustomerEnumTab.CustomerCompany}
          whenTrue={<CustomerCompany />}
        />
      </Form>
    </>
  );
};

export default EmployeRegistration;
