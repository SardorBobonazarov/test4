import {
  FetchView,
  Breadcrumbs,
  One,
  FieldType,
  TypedField,
  usePreventLeave,
} from "react-declarative";

import fetchApi from "../../helpers/fetchApi";
import history from "../../helpers/history";

import ITodoItem from "../../model/ITodoItem";

interface ITodoOnePageProps {
  id: string;
}

const fields: TypedField[] = [
  {

    type: FieldType.Div,
    style: {
      display: "grid",
      gridTemplateColumns: "auto 1fr",
      gap: "40px"
    },
    fields: [
      {
        type: FieldType.Div,
        style: {
          display: "flex",
          flexDirection: "column",
        },
        fields: [
          {
            type: FieldType.Paper,
          },
          {
            type: FieldType.Rating,
            name: "stars",
            defaultValue: 5
          }
        ]
      },
      {
        type: FieldType.Div,
        fields: [
          {
            type: FieldType.Line,
            title: "System info",
          },
          {
            type: FieldType.Combo,
            name: "prefix",
            title: "Gender",
            async itemList() {
                return [
                    'Mr.',
                    'Mrs.',
                ];
            },
          },
          {
            type: FieldType.Combo,
            name: "list",
            title: "Lists",
            async itemList() {
              return [
                  'List 1',
                  'List 2',
                  'List 3',
              ];
          },
          },
          {
            type: FieldType.Div,
            style: {
              display: "grid",
              gridTemplateColumns: "1fr auto"
            },
            fields: [
              {
                type: FieldType.Text,
                name: "keyword",
                title: "User id",
                outlined: false,
                disabled: true,
              },
              {
                type: FieldType.Checkbox,
                fieldBottomMargin: "0",
                name: "completed",
                title: "Completed",
                disabled: true,
              },
            ],
          },
        ]
      },
    ]
  },
  {
    type: FieldType.Line,
    title: "Common info",
  },
  {
    type: FieldType.Text,
    name: "firstName",
    title: "First name",
  },
  {
    type: FieldType.Text,
    name: "lastName",
    title: "Last name",
  },
  {
    type: FieldType.Text,
    name: "age",
    title: "Age",
  },

  {
    type: FieldType.Expansion,
    title: 'Subscription',
    description: 'Subscribe to get notified',
    fields: [
        {
            type: FieldType.Switch,
            title: 'Subscribe',
            name: 'subscribed',
            defaultValue: true,
        },
    ],
  },
  {
    type: FieldType.Div,
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    fields: [
      {
        type: FieldType.Line,
        title: "Job",
      },  
      {
        type: FieldType.Line,
        title: "Home address",
      },
    ],
  },

  {
    type: FieldType.Div,
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gridTemplateRows: "repeat(4, 1fr)"
    },
    fields: [
      {
        type: FieldType.Text,
        name: "jobTitle",
        title: "Position",
      },
      {
        type: FieldType.Text,
        name: "country",
        title: "Country",
      },
      {
        type: FieldType.Text,
        name: "jobArea",
        title: "Work place",
      },
      {
        type: FieldType.Text,
        name: "city",
        title: "City",
      },
      {
        type: FieldType.Div
      },
      {
        type: FieldType.Text,
        name: "state",
        title: "State",
      },
      {
        type: FieldType.Div
      },
      {
        type: FieldType.Text,
        name: "address",
        title: "Address",
      },
    ]
  }
];

export const TodoOnePage = ({ id }: ITodoOnePageProps) => {
  const fetchState = () => [
    fetchApi<ITodoItem>(`/users/${id}`)
  ] as const;

  const Content = (props: any) => {
    const { data, oneProps, beginSave } = usePreventLeave({
      history,
      onSave: () => {
        alert(JSON.stringify(data, null, 2));
        return true;
      },
    });

    return (
      <>
        <Breadcrumbs
          withSave
          title="Todo list"
          subtitle={props.todo.title}
          onSave={beginSave}
          onBack={() => history.push("/todos_list")}
          saveDisabled={!data}
        />
        <One<ITodoItem>
          handler={() => props.todo}
          fields={fields}
          {...oneProps}
        />
      </>
    );
  };

  return (
    <FetchView state={fetchState}>
      {(todo) => <Content todo={todo} />}
    </FetchView>
  );
};

export default TodoOnePage;
