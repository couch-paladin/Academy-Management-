# EduVance Academy — Terraform Infrastructure
# This file provisions all AWS resources for EduVance

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  required_version = ">= 1.0"
}

# AWS Provider — Sydney region (where Amplify is deployed)
provider "aws" {
  region = var.aws_region
}

# ══════════════════════════════════════
# IAM — GitHub Actions deployment user
# ══════════════════════════════════════
resource "aws_iam_user" "github_actions" {
  name = "github-actions-${var.project_name}"
  tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}

resource "aws_iam_user_policy_attachment" "amplify_access" {
  user       = aws_iam_user.github_actions.name
  policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess-Amplify"
}

# ══════════════════════════════════════
# SNS — Alert notifications
# ══════════════════════════════════════
resource "aws_sns_topic" "alerts" {
  name = "${var.project_name}-alerts"
  tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}

resource "aws_sns_topic_subscription" "email_alert" {
  topic_arn = aws_sns_topic.alerts.arn
  protocol  = "email"
  endpoint  = var.alert_email
}

# ══════════════════════════════════════
# CloudWatch — Monitoring alarms
# ══════════════════════════════════════

# Alarm 1: 5xx Server Errors
resource "aws_cloudwatch_metric_alarm" "server_errors" {
  alarm_name          = "${var.project_name}-5xx-errors"
  alarm_description   = "Alerts when EduVance returns 5 or more server errors in 5 minutes"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = 1
  metric_name         = "5xxErrors"
  namespace           = "AWS/AmplifyHosting"
  period              = 300
  statistic           = "Sum"
  threshold           = 5
  treat_missing_data  = "notBreaching"

  dimensions = {
    App = var.amplify_app_id
  }

  alarm_actions = [aws_sns_topic.alerts.arn]
  ok_actions    = [aws_sns_topic.alerts.arn]

  tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}

# Alarm 2: 4xx Client Errors
resource "aws_cloudwatch_metric_alarm" "client_errors" {
  alarm_name          = "${var.project_name}-4xx-errors"
  alarm_description   = "Alerts when EduVance returns 10 or more client errors in 5 minutes"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = 1
  metric_name         = "4xxErrors"
  namespace           = "AWS/AmplifyHosting"
  period              = 300
  statistic           = "Sum"
  threshold           = 10
  treat_missing_data  = "notBreaching"

  dimensions = {
    App = var.amplify_app_id
  }

  alarm_actions = [aws_sns_topic.alerts.arn]

  tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}

# Alarm 3: High Latency
resource "aws_cloudwatch_metric_alarm" "high_latency" {
  alarm_name          = "${var.project_name}-high-latency"
  alarm_description   = "Alerts when EduVance load time exceeds 5 seconds"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = 1
  metric_name         = "Latency"
  namespace           = "AWS/AmplifyHosting"
  period              = 300
  statistic           = "Average"
  threshold           = 5000
  treat_missing_data  = "notBreaching"

  dimensions = {
    App = var.amplify_app_id
  }

  alarm_actions = [aws_sns_topic.alerts.arn]

  tags = {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}

# ══════════════════════════════════════
# CloudWatch Dashboard
# ══════════════════════════════════════
resource "aws_cloudwatch_dashboard" "main" {
  dashboard_name = "${var.project_name}-monitoring"

  dashboard_body = jsonencode({
    widgets = [
      {
        type = "metric"
        properties = {
          title  = "EduVance — Requests & Errors"
          period = 300
          stat   = "Sum"
          metrics = [
            ["AWS/AmplifyHosting", "Requests", "App", var.amplify_app_id],
            ["AWS/AmplifyHosting", "4xxErrors", "App", var.amplify_app_id],
            ["AWS/AmplifyHosting", "5xxErrors", "App", var.amplify_app_id]
          ]
        }
      },
      {
        type = "metric"
        properties = {
          title  = "EduVance — Latency"
          period = 300
          stat   = "Average"
          metrics = [
            ["AWS/AmplifyHosting", "Latency", "App", var.amplify_app_id]
          ]
        }
      }
    ]
  })
}
