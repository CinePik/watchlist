#!/bin/bash

# This script is used to manage the seeding job for the CinePik Watchlist application in the Kubernetes cluster.
# It can either delete and recreate the seeding job or just delete it based on the provided flag.
#
# Usage:
#   ./run-seed-job.sh            - Deletes the existing seeding job (if any) and recreates it.
#   ./run-seed-job.sh -c         - Only deletes the existing seeding job without recreating it.
#   ./run-seed-job.sh --clean-only - Same as above; only deletes the existing seeding job.
#
# Arguments:
#   -c, --clean-only: Optional flag to indicate that only cleanup (deletion) of the existing job should be performed.
#
# The script expects a Kubernetes job definition file named 'seed-job.yml' in the same directory as the script.
# It uses 'kubectl' commands to interact with the Kubernetes cluster, so ensure 'kubectl' is installed and configured correctly.


exit_on_error() {
    echo "Error: $1" >&2
    exit 1
}

show_usage() {
    echo "Usage: $0 [-c | --clean-only]"
    exit 1
}

# Flag for cleanup mode
CLEAN_ONLY=0

# Parse command-line arguments
while [[ "$#" -gt 0 ]]; do
    case $1 in
        -c|--clean-only) CLEAN_ONLY=1 ;;
        *) show_usage ;;
    esac
    shift
done

# If cleanup mode is requested
if [ $CLEAN_ONLY -eq 1 ]; then
    kubectl delete job cinepik-watchlist-seeding-job --ignore-not-found=true || exit_on_error "Failed to delete existing job"
    echo "Seeding job deleted."
    exit 0
fi

kubectl delete job cinepik-watchlist-seeding-job --ignore-not-found=true || exit_on_error "Failed to delete existing job"
kubectl apply -f seed-job.yml || exit_on_error "Failed to apply new job"
echo "Seeding job restarted."