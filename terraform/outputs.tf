# EduVance Academy — Terraform Outputs
# These values are displayed after terraform apply

output "sns_topic_arn" {
  description = "ARN of the SNS alerts topic"
  value       = aws_sns_topic.alerts.arn
}

output "iam_user_name" {
  description = "IAM user for GitHub Actions"
  value       = aws_iam_user.github_actions.name
}

output "cloudwatch_dashboard_url" {
  description = "URL to view the CloudWatch dashboard"
  value       = "https://${var.aws_region}.console.aws.amazon.com/cloudwatch/home?region=${var.aws_region}#dashboards:name=${var.project_name}-monitoring"
}

output "server_error_alarm" {
  description = "Name of the 5xx error alarm"
  value       = aws_cloudwatch_metric_alarm.server_errors.alarm_name
}

output "latency_alarm" {
  description = "Name of the latency alarm"
  value       = aws_cloudwatch_metric_alarm.high_latency.alarm_name
}
