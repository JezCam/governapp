import { Document, Page, Text, View } from '@react-pdf/renderer';
import { createTw } from 'react-pdf-tailwind';
import type { ReportRowAssessment } from '../../../../convex/services/assessments';

export default function ReportPDF({
  assessmentReportRow,
}: {
  assessmentReportRow: ReportRowAssessment;
}) {
  const tw = createTw({});

  return (
    <Document>
      <Page size="A4" style={tw('text-sm')}>
        <View>
          <Text>{assessmentReportRow.name}</Text>
        </View>
        {assessmentReportRow.subRows.map((row) => (
          <View key={row.domain._id} style={{ marginLeft: 10 }}>
            <Text>{row.domain.name}</Text>
            {row.subRows.map((section) => (
              <View key={section.section._id} style={{ marginLeft: 20 }}>
                <Text>{section.section.name}</Text>
                {section.subRows.map((question) => (
                  <View key={question.question._id} style={{ marginLeft: 30 }}>
                    <Text>{question.question.text}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        ))}
      </Page>
    </Document>
  );
}
